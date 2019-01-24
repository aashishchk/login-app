import { Component, OnInit } from '@angular/core';

import { AuthenticateUserService } from '../services/authenticate-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: Object;
  constructor(private authenticateUserService: AuthenticateUserService) { }

  ngOnInit() {
    this.userInfo = this.authenticateUserService.authenticatedUserInfo();
  }
}
