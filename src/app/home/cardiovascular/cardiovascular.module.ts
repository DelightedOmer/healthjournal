import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CardiovascularPageRoutingModule } from './cardiovascular-routing.module';
import { CardiovascularPage } from './cardiovascular.page';

import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireDatabaseModule,
    CardiovascularPageRoutingModule
  ],
  declarations: [CardiovascularPage]
})
export class CardiovascularPageModule {}
