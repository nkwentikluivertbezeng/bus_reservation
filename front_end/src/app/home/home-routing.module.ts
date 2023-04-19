import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'booking/:id2/:user_id',
    loadChildren: () => import('../booking/booking.module').then( m => m.BookingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicStorageModule.forRoot()],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
