import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AddTaskComponent} from './add-task/add-task.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'add-task', component : AddTaskComponent },
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'card', loadChildren: './card/card.module#CardPageModule' },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule' },
  // { path: 'notification-list', loadChildren: './notification-list/notification-list.module#NotificationListPageModule' },
  // { path: 'add', loadChildren: './add/add.module#AddPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
