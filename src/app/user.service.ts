import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

// User's informations
export interface Userelement {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  patient?: string;
}

@Injectable()
export class UserService {
  public user$: Observable<Userelement[]>;
  userCollection: AngularFirestoreCollection<Userelement>;

  constructor(
    private afStore: AngularFirestore,
    private alert: AlertController) {
      this.userCollection = this.afStore.collection<Userelement>('users');
      this.user$ = this.userCollection.snapshotChanges().pipe(
              map(actions => {
              return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
              });
      })
      );
    }

    // function to set user information
    setUser(user: Userelement): Promise<void> {
      return this.userCollection.doc(user.uid).set(user);
    }

    updateUser(user: Userelement): Promise<void> {
      return this.userCollection.doc(user.uid).update(user);
    }

    deleteUser(uid: string) {
      this.userCollection.doc(uid).delete();
      console.log('Account successfully deleted!');
      return this.showAlert('Account', 'Account successfully deleted!');
    }


    getUser(id: string): Observable<Userelement> {
      return this.afStore.collection('users').doc<Userelement>(id).valueChanges().pipe(
      take(1),
      map( user => {
      console.log(user);
      return user;
      })
      );
}

// pop up alert message
async showAlert(header: string, message: string) {
const alert = this.alert.create({
header,
message,
buttons: ['OK']
});
await (await alert).present();
}
}
