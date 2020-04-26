import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cancer',
  templateUrl: './cancer.component.html',
  styleUrls: ['./cancer.component.scss'],
})
export class CancerComponent implements OnInit {

  stomachProblem: any = 0;
  dryMouth: any = 0;
  skinSensitivity: any = 0;
  neuropathy: any = 0;
  tiredness: any = 0;
  pain: any = 0;
  swelling: any = 0;
  bladderControlIssues: any = 0;
  unintentionalWeight: any = 0;
  nightSweatsFlashes: any = 0;

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
    .set({cancer:
      {pain: this.pain}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  stomachProblemChange(event) {
    this.stomachProblem = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      stomachProblem: this.stomachProblem}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  dryMouthChange(event) {
    this.dryMouth = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      dryMouth: this.dryMouth}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  skinSensitivityChange(event) {
    this.skinSensitivity = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      skinSensitivity: this.skinSensitivity}}, {merge: true});
   // return this.showAlert('You choose number ' + event);
  }
  neuropathyChange(event) {
    this.neuropathy = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      neuropathy: this.neuropathy}}, {merge: true});
  //  return this.showAlert('You choose number ' + event);
  }
  tirednessChange(event) {
    this.tiredness = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      tiredness: this.tiredness}}, {merge: true});
  //  return this.showAlert('You choose number ' + event);
  }
  swellingChange(event) {
    this.swelling = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      swelling: this.swelling}}, {merge: true});
    // return this.showAlert('You choose number ' + event);
  }
  bladderControlIssuesChange(event) {
    this.bladderControlIssues = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      bladderControlIssues: this.bladderControlIssues}}, {merge: true});
    // return this.showAlert('You choose number ' + event);
  }
  unintentionalWeightChange(event) {
    this.unintentionalWeight = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      unintentionalWeight: this.unintentionalWeight}}, {merge: true});
    // return this.showAlert('You choose number ' + event);
  }
  nightSweatsFlashesChange(event) {
    this.nightSweatsFlashes = event;
    console.log(event);
    this.afStore
    .doc(`users/${this.Uauth.cUid}/survey/${this.date}`)
    .set({cancer: {
      nightSweatsFlashes: this.nightSweatsFlashes}}, {merge: true});
    // return this.showAlert('You choose number ' + event);
    return this.router.navigate(['/tabs/questions/document']);
  }
}
