import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as firebase from 'Firebase';
import { NavParams } from '@ionic/angular';
import { ProfileService, ProfileElement } from 'src/app/profile.service';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

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
  nickName: string = null;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(
    private Aroute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private proService: ProfileService
  ) {
  //  this.Aroute.queryParams.subscribe(params => {
  //    if (params && params.nickName) {
  //      this.nickName = params.nickName;
  //    }
  //  });
    this.nickName = this.proService.nickName;
    console.log(this.nickName);

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

