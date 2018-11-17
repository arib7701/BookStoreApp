import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private credential = {
    username: '',
    password: ''
  };
  loggedIn: Boolean = false;
  subscriptionCredential: Subscription;
  subscriptionSession: Subscription;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.subscriptionSession = this.loginService.checkSession().subscribe(
      result => {
        this.loggedIn = true;
        console.log('CheckSession OK - Logged In');
      },
      error => {
        this.loggedIn = false;
        console.log('CheckSession KO - Not Logged In');
      }
    );
  }

  onSubmit() {
    this.subscriptionCredential = this.loginService
      .sendCredential(this.credential.username, this.credential.password)
      .subscribe(
        result => {
          console.log(result);
          localStorage.setItem('xAuthToken', result.json().token);
          this.loggedIn = true;
          location.reload();
        },
        error => {
          console.log('Error login', error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscriptionCredential !== undefined) {
      this.subscriptionCredential.unsubscribe();
    }
    if (this.subscriptionSession !== undefined) {
      this.subscriptionSession.unsubscribe();
    }
  }
}
