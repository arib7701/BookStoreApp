import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../const/app-const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http: Http) {}

  sendCredential(username: string, password: string) {
    // localhost:8181 backend Rest API url
    const url = `${this.serverPath}/token`;

    // encoded info to form header following angular http requirement
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = `Basic ${encodedCredentials}`;

    // set up headers
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: basicHeader
    });

    // return response from get request
    return this.http.get(url, { headers: headers });
  }

  checkSession() {
    const url = `${this.serverPath}/checkSession`;
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, { headers: headers });
  }

  logout() {
    const url = `${this.serverPath}/user/logout`;
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '', { headers: headers });
  }
}
