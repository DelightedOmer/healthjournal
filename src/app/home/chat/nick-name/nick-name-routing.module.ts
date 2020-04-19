import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NickNamePage } from './nick-name.page';

const routes: Routes = [
  {
    path: '',
    component: NickNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NickNamePageRoutingModule {}
