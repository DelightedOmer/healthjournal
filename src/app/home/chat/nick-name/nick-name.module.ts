import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NickNamePageRoutingModule } from './nick-name-routing.module';

import { NickNamePage } from './nick-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NickNamePageRoutingModule
  ],
  declarations: [NickNamePage]
})
export class NickNamePageModule {}
