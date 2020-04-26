import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service'; // import Authservice from auth.service

import { LoginComponent } from '../../login/login.component'; // import login elements from login component
import { RegisterPage } from 'src/app/register/register.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  logo = '../../../assets/logo.png';
  constructor(
    public Uauth: AuthService,
    public ln: LoginComponent,
    public rg: RegisterPage
    ) { }

  ngOnInit() {
  }

}
