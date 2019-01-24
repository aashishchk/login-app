import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticateUserService } from '../services/authenticate-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  requestInProcess = false;
  authorizationFailed = null;
  @ViewChild ('f') userCred: NgForm;

  constructor(private authenticateUserService: AuthenticateUserService, private router: Router) {

  }

  ngOnInit() {
    this.authenticateUserService.authenticationCall.subscribe(data => {
      this.authorizationFailed = null;
      this.requestInProcess = false;
      if (data.success) {
        this.router.navigate(['dashboard']);
      }else {
        this.authorizationFailed = {};
        this.authorizationFailed.message = data.message;
      }
    });
  }

  inputFocus() {
    this.authorizationFailed = null;
  }

  submitCredentials() {
    // submit the form using the service
    this.requestInProcess = true;
    this.authenticateUserService.authenticateLogin(this.userCred.form.value);
  }
}
