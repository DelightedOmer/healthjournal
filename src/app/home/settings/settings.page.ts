import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) { }

  logOut() {
    this.afAuth.auth.signOut();
    return this.router.navigate(['/tabs']);
  }

  ngOnInit() {
  }

}
