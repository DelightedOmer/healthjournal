import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as firebase from 'Firebase';
import { NavParams } from '@ionic/angular';

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})

export class RoomPage implements OnInit {
  nickName: any;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(
    private Aroute: ActivatedRoute,
    private router: Router
  ) {
    this.Aroute.queryParams.subscribe(params => {
      if (params && params.nickName) {
        this.nickName = params.nickName;
      }
    });

    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });

   }
   addRoom() {
    this.router.navigate(['add-room']);
  }

  joinRoom(key: any) {
    const navExtras: NavigationExtras = {
      queryParams: {
        nickName: JSON.stringify(this.nickName),
        roomKey: JSON.stringify(key)
      }
    };
    this.router.navigate(['home'], navExtras);
  }
  ngOnInit() {
  }

}

