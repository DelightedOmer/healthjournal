import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss'],
})
export class GoogleComponent implements OnInit {
  loading: any;
  users: Observable<firebase.User>;

  constructor(
    private router: Router,
    private platform: Platform,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.users = this.fireAuth.authState;
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }

  async presentLoading(loading) {
    await loading.present();
  }

  async googleLogin() {
    let params;
    if (this.platform.is('cordova')) {
      params = {
        // tslint:disable-next-line: object-literal-key-quotes
        'webClientId': '708207196987-9gsu5c9j69mc5hacd41t6nji27fmbd38.apps.googleusercontent.com',
        // tslint:disable-next-line: object-literal-key-quotes
        'offline': true,
        // tslint:disable-next-line: object-literal-key-quotes
        'scopes': 'profile email'

      };

      this.google.login(params)
    .then((response) => {
      const { idToken, accessToken } = response;
      this.onLoginSuccess(idToken, accessToken);
    }).catch((error) => {
      console.log(error);
      alert('error:' + JSON.stringify(error));
    });
    } else {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.fireAuth.auth.signInWithPopup(provider);
        if (credential.user) {
          this.updateUserData(credential.user);
        }
        const navExtras: NavigationExtras = {
          queryParams: { uid: credential.user.uid}
        };
        this.router.navigate(['/profile'], navExtras);
        this.loading.dismiss();
      } catch (err) {
        console.log(err);
      }
    }
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        const navExtras: NavigationExtras = {
          queryParams: { uid: credential.idToken}
        };
        this.router.navigate(['/profile'], navExtras);
        this.loading.dismiss();
      });
  }

  private updateUserData({uid, email, displayName, photoURL }: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${uid}`);

    const data = {
        uid,
        email,
        displayName,
        photoURL
      };
    return userRef.set(data, {merge: true });
  }

  onLoginError(err) {
    console.log(err);
  }
}
