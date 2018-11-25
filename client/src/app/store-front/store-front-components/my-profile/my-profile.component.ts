import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConst } from '../../../const/app-const';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private serverPath = AppConst.serverPath;
  private dataFetched = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credential = { username: '', password: '' };

  private user: User;
  private updateSuccess: boolean;
  private newPassword: string;
  private incorrectPassword: boolean;
  private currentPassword: string;

  subscriptionUpdate: Subscription;
  subscriptionUser: Subscription;
  subscriptionLogin: Subscription;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}

  onUpdateUserInfo() {
    console.log('current pass ', this.currentPassword);
    console.log('username ', this.user.username);

    this.subscriptionUpdate = this.userService
      .updateUserInfo(this.user, this.newPassword, this.currentPassword)
      .subscribe(
        result => {
          console.log(result.text());
          this.updateSuccess = true;
        },
        error => {
          console.log(error.text());
          const errorMessage = error.text();
          if (errorMessage === 'Error updating info!') {
            this.incorrectPassword = true;
          }
        }
      );
  }

  ngOnInit() {
    this.subscriptionLogin = this.loginService.checkSession().subscribe(
      result => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
        console.log('Inactive session');
        this.router.navigate(['/myAccount']);
      }
    );

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.subscriptionUser = this.userService.getCurrentUser().subscribe(
      result => {
        this.user = result.json();
        this.dataFetched = true;
      },
      error => {
        console.log('Error ', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscriptionUpdate !== undefined) {
      this.subscriptionUpdate.unsubscribe();
    }
    if (this.subscriptionUser !== undefined) {
      this.subscriptionUser.unsubscribe();
    }
    if (this.subscriptionLogin !== undefined) {
      this.subscriptionLogin.unsubscribe();
    }
  }
}
