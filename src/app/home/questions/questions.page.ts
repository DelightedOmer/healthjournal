import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';

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

  happy: any = '../../../assets/numbers/one.svg';
  smile = '../../../assets/numbers/two.svg';
  normal = '../../../assets/numbers/three.svg';
  sad = '../../../assets/numbers/four.svg';
  cry = '../../../assets/numbers/five.svg';

  verifiedEmail = true;
  date: string = new Date().toDateString();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public navCtrl: NavController,
    private afStore: AngularFirestore,
    private Uauth: AuthService,
    private alert: AlertController,
    user: UserService) {
      this.afAuth.authState.subscribe(() => {
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
    return this.showAlert('You choose number ' + event);
  }
  breathChange(event) {
    this.breath = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      breath: this.breath}, {merge: true});
    return this.showAlert('You choose number ' + event);
  }
  legsChange(event) {
    this.legs = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      legs: this.legs}, {merge: true});
    return this.showAlert('You choose number ' + event);
  }
  coughChange(event) {
    this.cough = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      cough: this.cough}, {merge: true});
    return this.showAlert('You choose number ' + event);
  }
  hoarsenessChange(event) {
    this.hoarseness = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      hoarseness: this.hoarseness}, {merge: true});
    return this.showAlert('You choose number ' + event);
  }
  fatiqueChange(event) {
    this.hoarseness = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      hoarseness: this.hoarseness}, {merge: true});
    return this.showAlert('You choose number ' + event);
  }
  weightChange(event) {
    this.weight = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({
      weight: this.weight}, {merge: true});
    return this.showAlert('You choose number ' + event);
  }

  ngOnInit() {
  }

  refresh() {
    window.location.reload();
  }

  async showAlert(message: string) {
    const alert = this.alert.create({
      message,
      buttons: ['OK']
    });
    await (await alert).present();
  }
}
