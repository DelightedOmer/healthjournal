import { Injectable } from '@angular/core';
import { Userelement, UserService } from './user.service';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class AuthService {

   // Observable provide support for passing messages
  //  between publishers and subscribers in your application.
    user$: Observable<Userelement>;
    authState: any = null;

    constructor(
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore,
        public userS: UserService,

    ) {
      // User authentication function
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afStore.doc<Userelement>(`users/${user.uid}`).valueChanges();
                } else {
                    return of (null);
                }
            })
        );
        this.afAuth.authState.subscribe(data => this.authState = data );
      }

      // authenticated or not
      get authenticated(): boolean {
        return this.authState !== null;
      }

      // to get user data
      get cUid(): string {
        return this.authenticated ? this.authState.uid : null;
      }

}
