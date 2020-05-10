import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';


import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import * as firebase from 'firebase';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface ProfileElement {
  id?: any;
  fullName: string;
  nickName: string;
  gender: string;
  age: number;
  maritalStatus: string;

  work: string;
  natureOfJob: string;

  chronicProblem: string;

  hospital: string;
  doctor: string;
  procedure: string;
  medication: string;
  sideEffect: string;

  ethnicity: string;
  foodHabbit: string;
  citiesLivedpast: string;

  state: string;
  city: string;
  streetName: string;
  streetNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public nickName: string;
  public profile: Observable<ProfileElement[]>;
  proCollection: AngularFirestoreCollection<ProfileElement>;
  uid;
  constructor(
    private afStore: AngularFirestore,
    private router: Router,
    public auth: AuthService) {
      this.uid = this.auth.cUid;
      this.proCollection = this.afStore.collection<ProfileElement>('users');
      this.profile = this.proCollection.snapshotChanges().pipe(
            map(actions => {
            return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
            });
    })
    ); }

    setProfile(pro: ProfileElement, id: any) {
      return this.proCollection.doc(id).set(pro, {merge: true});
    }

    updateProfile(pro: ProfileElement): Promise<void> {
      return this.proCollection.doc(this.uid).update({
        fullName: pro.fullName,
        nickName: pro.nickName,
        gender: pro.gender,
        age: pro.age,
        maritalStatus: pro.maritalStatus,
        work: pro.work,
        natureOfJob: pro.natureOfJob,
        state: pro.state,
        city: pro.city,
        streetName: pro.streetName,
        streetNumber: pro.streetNumber
      });
    }

    getPro(): Observable<ProfileElement[]> {
      return this.profile;
    }
    pro(id: string): Observable<ProfileElement> {
      return this.afStore.collection('users').doc<ProfileElement>(id).valueChanges().pipe(
      take(1),
      map( pro => {
      this.nickName = pro.nickName;
      return pro;
      })
      );
    }
}
