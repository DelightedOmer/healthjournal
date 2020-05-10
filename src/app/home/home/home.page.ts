import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService, Userelement } from 'src/app/user.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ProfileService, ProfileElement } from 'src/app/profile.service';

import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public Profile: Observable<ProfileElement>;

  uid;
  latitude;
  longitude;
  verifiedEmail = true;
  feelDisable: boolean;
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
    private user: UserService,
    private proService: ProfileService,
    private router: Router,
    private geolocation: Geolocation,
    private fcm: FCM,
    public plt: Platform) {
      this.uid = this.Uauth.cUid;
      //  this.Profile = this.user.getUser(this.uid);
      this.Profile = this.proService.pro(this.uid);

      this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log('Received in background');
          } else {
            console.log('Received in foreground');
          }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      });
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
    this.afStore.doc(`users/${this.uid}/survey/${date}`)
    .set({
      feel: feelings}, {merge: true});
    console.log(feelings);
    this.feelDisable = true;

    const navExtra: NavigationExtras = {
      queryParams: {
        latitude:  Number(this.latitude),
        longitude: Number(this.longitude)
      }
    };
    return this.router.navigate(['/tabs/questions'], navExtra);
  }

  ngOnInit() {
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
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
