import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService, Userelement } from 'src/app/user.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  info: Observable<Userelement>;
  verifiedEmail = true;
  happy: any = '../../../assets/1.png';
  smile = '../../../assets/2.png';
  normal = '../../../assets/3.png';
  sad = '../../../assets/4.png';
  cry = '../../../assets/5.png';

  constructor(
    private afStore: AngularFirestore,
    public Uauth: AuthService,
    public alert: AlertController,
    public afAuth: AngularFireAuth,
    private user: UserService) {

    //  this.afAuth.authState.subscribe(user$ => {
      //  if (user) {
        //   setInterval(() => {
          //   this.verifiedEmail = this.afAuth.auth.currentUser.emailVerified;
          // }, 1000);
       //  }
      // });
     }

  submit(parameter) {
    const feelings = parameter;
    const date: string = new Date().toDateString();
    this.afStore.doc(`users/${this.Uauth.cUid}/survey/${date}`)
    .set({
      feel: feelings}, {merge: true});
    console.log(feelings);
    // tslint:disable-next-line: no-conditional-assignment
    if (feelings === 1) {
      this.showAlert('Hurray..!', 'You are very happy today');
    } else if (feelings === 2) {
      this.showAlert('Hurray..!', 'You are happy today');
    } else if (feelings === 3) {
      this.showAlert('Hello..!', 'You are good today');
    } else if (feelings === 4) {
      this.showAlert('Oh no..!', 'You are sad today');
    } else {
      this.showAlert('Oh no!', 'You are so sad today');
    }
  }

  ngOnInit() {
    const uid = this.Uauth.cUid;
    console.log(uid);
    this.info = this.user.getUser(uid);
    console.log(this.info);
  }

  refresh() {
    window.location.reload();
  }

  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await (await alert).present();
  }

}
