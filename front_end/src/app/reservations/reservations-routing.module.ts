import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsPage } from './reservations.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsPage
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsPageRoutingModule {}
