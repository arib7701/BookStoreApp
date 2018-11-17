import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private loggedIn = false;
  subscriptionLogout: Subscription;
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

  logout() {
    this.subscriptionLogout = this.loginService.logout().subscribe(
      result => {
        this.loggedIn = false;
        location.reload();
      },
      error => {
        console.log('Error logout', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptionLogout !== undefined) {
      this.subscriptionLogout.unsubscribe();
    }
    if (this.subscriptionSession !== undefined) {
      this.subscriptionSession.unsubscribe();
    }
  }
}
