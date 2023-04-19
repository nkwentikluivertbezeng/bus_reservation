import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusModalPage } from './bus-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BusModalPage
  },
  {
    path: 'booking/:id2/:user_id',
    loadChildren: () => import('../booking/booking.module').then( m => m.BookingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusModalPageRoutingModule {}
