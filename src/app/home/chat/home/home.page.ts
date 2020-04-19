import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  data = { type: '', nickName: '', message: '' };
  chats: any = [];
  roomkey: string = null;
  nickName: string = null;
  offStatus: boolean;

  constructor(
    private Aroute: ActivatedRoute,
    private router: Router
  ) {
    this.Aroute.queryParams.subscribe(params => {
      if (params && params.nickName) {
        this.nickName = JSON.parse(params.nickName);
        this.roomkey = JSON.parse(params.roomKey);
      }

      this.offStatus = false;
      this.data.type = 'message';
      this.data.nickName = this.nickName;

      const joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
      joinData.set({
      type: 'join',
      user: this.nickName,
      message: this.nickName + ' has joined this room.',
      sendDate: Date()
      });
      this.data.message = '';


      firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
      if (this.offStatus === false) {
       // this.content.scrollToBottom(300);
      }
    }, 1000);
  });
    });
  }

  sendMessage() {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickName,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    const exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.nickName,
      message: this.nickName + ' has exited this room.',
      sendDate: Date()
    });
    this.offStatus = true;

    const navExtras: NavigationExtras = {
      queryParams: {
        nickName: this.data.nickName
      }
    };
    this.router.navigate(['room'], navExtras);
  }

  ngOnInit() {
  }
}

