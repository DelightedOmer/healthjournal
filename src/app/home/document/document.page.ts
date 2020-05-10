import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {


  food: string = null;
  exercise: string = null;
  entertaintments: string = null;
  visits: string = null;
  events: string = null;
  others: string = null;
  summary: string = null;

  completedTags = [
      'breakfast', 'lunch', 'dinner',
      'push up', 'chain up',
      'tv', 'music', 'sports', 'movie', 'theater',
      'family', 'patient', 'old reahabilitaion',
      'social activities',
      'general', 'health'
  ];

  constructor(
    public Uauth: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private afdb: AngularFireDatabase,
    private alert: AlertController,
    public navCtrl: NavController,
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  backbtn() {
    this.router.navigate(['/tabs/questions']);
  }

  async submit() {
    const summary = this.summary;
    const food = this.food;
    const exercise = this.exercise;
    const entertaintments = this.entertaintments;
    const visits = this.visits;
    const events = this.events;
    const ohters = this.others;
    const date: string = new Date().toDateString();

    const res = this.afStore.doc(`users/${this.Uauth.cUid}/survey/${date}`);
    const data = {food, exercise, entertaintments, visits, events, ohters
    };

    res.set({summary: {summary}}, {merge: true});
    this.router.navigate(['/tabs/questions']);
  }
}
