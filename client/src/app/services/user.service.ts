import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../const/app-const';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http: Http) {}

  newUser(username: string, email: string) {
    const url = `${this.serverPath}/user/newUser`;
    const userInfo = {
      username: username,
      email: email
    };

    const tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {
      headers: tokenHeader
    });
  }

  retrievePassword(email: string) {
    const url = `${this.serverPath}/user/forgetPassword`;
    const userInfo = {
      email: email
    };

    const tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {
      headers: tokenHeader
    });
  }
}
