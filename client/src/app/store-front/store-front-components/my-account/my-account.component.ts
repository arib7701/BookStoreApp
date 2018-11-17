import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { AppConst } from 'src/app/const/app-const';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private loginError: Boolean = false;
  private loggedIn: Boolean = false;
  private credential = { username: '', password: '' };

  private emailSent: Boolean = false;
  private usernameExists: Boolean;
  private emailExists: Boolean;
  private username: string;
  private email: string;
  private emailNotExists: Boolean = false;
  private forgetPasswordEmailSent: Boolean;
  private recoverEmail: string;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}

  onLogin() {
    this.loginService
      .sendCredential(this.credential.username, this.credential.password)
      .subscribe(
        result => {
          console.log(result);
          localStorage.setItem('xAuthToken', result.json().token);
          this.loggedIn = true;
          this.router.navigate(['/']);
        },
        error => {
          this.loggedIn = false;
          this.loginError = true;
          console.log('Error login ', error);
        }
      );
  }

  onNewAccount() {
    this.usernameExists = false;
    this.emailExists = false;
    this.emailSent = false;

    this.userService.newUser(this.username, this.email).subscribe(
      result => {
        console.log(result);
        this.emailSent = true;
      },
      error => {
        console.log('Error creatin new user ', error);
        const errorMessage = error.text();
        if (errorMessage === 'usernameExists') {
          this.usernameExists = true;
        }
        if (errorMessage === 'emailExists') {
          this.emailExists = true;
        }
      }
    );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      result => {
        console.log(result);
        this.forgetPasswordEmailSent = true;
      },
      error => {
        console.log('error retrieving email ', error);
        const errorMessage = error.text();
        if (errorMessage === 'Email not found') {
          this.emailNotExists = true;
        }
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      result => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
        console.log('error checking session ', error);
      }
    );
  }
}
