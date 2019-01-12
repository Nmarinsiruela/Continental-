import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConstants } from './helpers/Constants';
import { StoredUsersGuard } from './helpers/StoredUsersGuard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [StoredUsersGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'game',
    loadChildren: './game/game.module#GamePageModule',
    // canActivate: [StoredUsersGuard]
  },
  {
    path: 'end',
    loadChildren: './end/end.module#EndPageModule',
    // canActivate: [StoredUsersGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
