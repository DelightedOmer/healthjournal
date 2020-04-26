import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cardiovascular',
  templateUrl: './cardiovascular.component.html',
  styleUrls: ['./cardiovascular.component.scss'],
})
export class CardiovascularComponent implements OnInit {

  pain: any = 0;
  breath: any = 0;
  legs: any = 0;
  cough: any = 0;
  hoarseness: any = 0;
  fatique: any = 0;
  weight: any = 0;

  zero = '../../../assets/numbers/zero.png';
  one = '../../../assets/numbers/one.png';
  two = '../../../assets/numbers/two.png';
  three = '../../../assets/numbers/three.png';
  four = '../../../assets/numbers/four.png';

  date: string = new Date().toDateString();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public navCtrl: NavController,
    private afStore: AngularFirestore,
    private Uauth: AuthService) { }


  ngOnInit() {}
  painChange(event) {
    this.pain = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      pain: this.pain}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  breathChange(event) {
    this.breath = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      breath: this.breath}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  legsChange(event) {
    this.legs = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      legs: this.legs}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  coughChange(event) {
    this.cough = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      cough: this.cough}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  hoarsenessChange(event) {
    this.hoarseness = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      hoarseness: this.hoarseness}}, {merge: true});
  //  return this.showAlert('You choose number ' + event);
  }
  fatiqueChange(event) {
    this.fatique = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      fatique: this.fatique}}, {merge: true});
  //  return this.showAlert('You choose number ' + event);
  }
  weightChange(event) {
    this.weight = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cardiovascular: {
      weight: this.weight}}, {merge: true});
    // return this.showAlert('You choose number ' + event);
    return this.router.navigate(['/tabs/questions/document']);
  }
}
