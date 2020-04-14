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


  food = [];
  exercise = [];
  entertaintments = [];
  visits = [];
  events = [];
  others = [];

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
    const food = this.food;
    const exercise = this.exercise;
    const entertaintments = this.entertaintments;
    const visits = this.visits;
    const events = this.events;
    const ohters = this.others;
    const date: string = new Date().toDateString();

    const res = this.afdb.database.ref(`users/${this.Uauth.cUid}/summary/${date}`);
    const data = {
      food, exercise, entertaintments, visits, events, ohters
    };

    res.update(data);
    this.router.navigate(['/tabs/questions']);
    return this.router.navigate(['/tabs']);
  }
}
