import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  pain: any = 0;
  breath: any = 0;
  legs: any = 0;
  cough: any = 0;
  hoarseness: any = 0;
  fatique: any = 0;
  weight: any = 0;

  happy: any = '../../../assets/1.png';
  smile = '../../../assets/2.png';
  normal = '../../../assets/3.png';
  sad = '../../../assets/4.png';
  cry = '../../../assets/5.png';

  verifiedEmail = true;
  date: string = new Date().toDateString();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public navCtrl: NavController,
    private afdb: AngularFireDatabase,
    private afStore: AngularFirestore,
    private Uauth: AuthService,
    private user: UserService) {
      this.afAuth.authState.subscribe(user$ => {
        if (user) {
           setInterval(() => {
             this.verifiedEmail = this.afAuth.auth.currentUser.emailVerified;
           }, 1000);
         }
       });
    }

  nextbtn() {
    this.router.navigate(['/tabs/questions/document']);
  }

  painChange(event) {
    this.pain = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      pain: this.pain}, {merge: true});
  }
  breathChange(event) {
    this.breath = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      breath: this.breath}, {merge: true});
  }
  legsChange(event) {
    this.legs = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      legs: this.legs}, {merge: true});
  }
  coughChange(event) {
    this.cough = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      cough: this.cough}, {merge: true});
  }
  hoarsenessChange(event) {
    this.hoarseness = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      hoarseness: this.hoarseness}, {merge: true});
  }
  fatiqueChange(event) {
    this.hoarseness = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      hoarseness: this.hoarseness}, {merge: true});
  }
  weightChange(event) {
    this.weight = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      weight: this.weight}, {merge: true});
  }

  ngOnInit() {
  }

  refresh() {
    window.location.reload();
  }

}
