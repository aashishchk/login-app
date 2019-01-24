import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import * as globals from '../globals';

@Injectable()
export class AuthenticateUserService {
  userAuthenticated = false;
  userInfo = {};
  authenticationCall = new Subject<any>();

  constructor(private http: Http) { }

  authenticateLogin(userCred) {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(userCred.username + ':' + userCred.password));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });

    this.http.post(`${globals.API_URL}/login`, '', options)
    .subscribe(
      (data: Response) => {
        this.userAuthenticated = true;
        this.userInfo = data.json();
        this.authenticationCall.next({success: true, message: 'Operation successful'});
      },
      error => {
        this.userAuthenticated = false;
        this.authenticationCall.next({success: false, message: error.statusText});
      }
    );
  }

  isUserAuthenticated() {
    return this.userAuthenticated;
  }
  authenticatedUserInfo() {
    return this.userInfo;
  }
  logoutUser() {
    this.userAuthenticated = false;
  }
}
