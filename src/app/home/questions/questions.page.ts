import { Component, OnInit } from '@angular/core';

import { CardiovascularComponent } from '../../cardiovascular/cardiovascular.component';
import { CancerComponent } from '../../cancer/cancer.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Userelement, UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  info: Observable<Userelement>;

  constructor(
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    public cardi: CardiovascularComponent,
    public canc: CancerComponent
  ) {}

  ngOnInit() {
    const uid = this.auth.cUid;
    console.log(uid);
    this.info = this.user.getUser(uid);
    console.log(this.info);
  }

  nextbtn() {
    this.router.navigate(['/tabs/questions/document']);
  }

  refresh() {
    window.location.reload();
  }
}
