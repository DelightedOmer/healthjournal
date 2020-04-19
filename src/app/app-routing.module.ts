import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./home/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cardiovascular',
    loadChildren: () => import('./home/cardiovascular/cardiovascular.module').then( m => m.CardiovascularPageModule)
  },
  {
    path: 'nick-name',
    loadChildren: () => import('./home/chat/nick-name/nick-name.module').then( m => m.NickNamePageModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./home/chat/room/room.module').then( m => m.RoomPageModule)
  },
  {
    path: 'add-room',
    loadChildren: () => import('./home/chat/add-room/add-room.module').then( m => m.AddRoomPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/chat/home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
