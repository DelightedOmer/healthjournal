import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QuestionsPage } from './questions.page';

import { IonicRatingModule } from 'ionic-rating';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    AngularFireDatabaseModule,
    RouterModule.forChild([{ path: '', component: QuestionsPage }])
  ],
  declarations: [QuestionsPage]
})
export class QuestionsPageModule {}
