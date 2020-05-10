import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CardiovascularComponent } from '../../cardiovascular/cardiovascular.component';
import { CancerComponent } from '../../cancer/cancer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Userelement, UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  info: Observable<Userelement>;
  offStatus = false;
  latitude;
  longitude;
  uid;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private auth: AuthService,
    private user: UserService,
    public cardi: CardiovascularComponent,
    public canc: CancerComponent
  ) {
    this.uid = this.auth.cUid;

    this.aRoute.queryParams.subscribe(params => {
      if (params.latitude && params.longitude) {
        this.latitude = params.latitude;
        this.longitude = params.longitude;
      } else {
        console.log('No location parameter found');
      }
    });
  }

  ngOnInit() {
    this.info = this.user.getUser(this.uid);
  }

  scroll() {
    setTimeout(() => {
    if (this.offStatus === false) {
      this.content.scrollToBottom(300);
    }
  }, 1000);

    const latitude = this.latitude; const longitude = this.longitude;
    this.user.setLocation({
    location: {latitude, longitude}
    }, this.uid);
  }

  nextbtn() {
    this.router.navigate(['/tabs/questions/document']);
  }

  refresh() {
    window.location.reload();
  }
}
