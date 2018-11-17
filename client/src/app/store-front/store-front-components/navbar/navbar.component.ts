import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private loggedIn = false;
  private subscriptionSession: Subscription;
  private subscriptionLogout: Subscription;

  constructor(private loginService: LoginService) {}

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
    if (this.subscriptionSession !== undefined) {
      this.subscriptionSession.unsubscribe();
    }
    if (this.subscriptionLogout !== undefined) {
      this.subscriptionLogout.unsubscribe();
    }
  }
}
