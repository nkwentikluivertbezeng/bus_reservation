import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { BusModalPageRoutingModule } from './bus-modal-routing.module';

import { BusModalPage } from './bus-modal.page';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule ,
    FormsModule,
    IonicModule,
    BusModalPageRoutingModule
  ],
  declarations: [BusModalPage]
})
export class BusModalPageModule {}
