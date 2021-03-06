import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cardiovascular',
  templateUrl: './cardiovascular.page.html',
  styleUrls: ['./cardiovascular.page.scss'],
})
export class CardiovascularPage implements OnInit {
  happy: any = '../../../assets/1.png';
  smile = '../../../assets/2.png';
  normal = '../../../assets/3.png';
  sad = '../../../assets/4.png';
  cry = '../../../assets/5.png';

  constructor(
    private afdb: AngularFireDatabase,
    public Uauth: AuthService,
    public alert: AlertController,
    public afAuth: AngularFireAuth,
    private user: UserService) { }

  ngOnInit() {
  }

  submit(parameter) {
    const feel = parameter;
    const date: string = new Date().toDateString();
    this.afdb.database.ref(`users/${this.Uauth.cUid}/feelings/${date}`).set(feel);
    console.log(feel);
    // tslint:disable-next-line: no-conditional-assignment
    if (feel === 1) {
      this.showAlert('Hurray..!', 'You are very happy today');
    } else if (feel === 2) {
      this.showAlert('Hurray..!', 'You are happy today');
    } else if (feel === 3) {
      this.showAlert('Hello..!', 'You are good today');
    } else if (feel === 4) {
      this.showAlert('Oh no..!', 'You are sad today');
    } else {
      this.showAlert('Oh no!', 'You are so sad today');
    }
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
