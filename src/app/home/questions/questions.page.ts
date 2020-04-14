import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
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
    private Uath: AuthService,
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
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      pain: this.pain});
  }
  breathChange(event) {
    this.breath = event;
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      breath: this.breath});
  }
  legsChange(event) {
    this.legs = event;
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      legs: this.legs});
  }
  coughChange(event) {
    this.cough = event;
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      cough: this.cough});
  }
  hoarsenessChange(event) {
    this.hoarseness = event;
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      hoarseness: this.hoarseness});
  }
  fatiqueChange(event) {
    this.hoarseness = event;
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      hoarseness: this.hoarseness});
  }
  weightChange(event) {
    this.weight = event;
    this.afdb.database
    .ref(`users/${this.Uath.cUid}/welbeing questions/${this.date}`)
    .update({
      weight: this.weight});
  }

  ngOnInit() {
  }

  refresh() {
    window.location.reload();
  }

}
