import { schedule } from 'src/schedule';

import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BusModalPage } from '../bus-modal/bus-modal.page';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Mousewheel]);
import axios from 'axios';

@Component({
  selector: 'app-booking',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  date =new Date();
  count: number = 1;
  search_results: any = []
  advertisment_schedule: any = []
  seats: number = 0
  FromLocation: string = ''
  Time: string = ''
  ToLocation: string = ''
  error: string[] = []
  slideOpts: any;
  search: boolean=false;
  constructor( private modalController: ModalController,private route: ActivatedRoute) { }

  async openBusModal() {
    const modal = await this.modalController.create({
      component: BusModalPage,
      componentProps: {
        selectedLocation: this.FromLocation,
        selectedDestination: this.ToLocation,
        date:this.date,
        user_id:this.user_id
      }
    });
    return await modal.present();
  }

  onSelectFromLocation(selectedValue: any) {
    this.FromLocation = selectedValue.detail.value

  }
  onSelectToLocation(selectedValue: any) {
    this.ToLocation = selectedValue.detail.value

  }
  user_id: number=0;
 async ngOnInit() {

  this.user_id = parseInt(this.route.snapshot.queryParamMap.get('user_id') as string);
  alert(this.user_id)
  await  axios.get('http://localhost:5000/admin/schedule/count').then(res => {
      this.count = res.data;
    })
  
    if (this.count > 0) {
      axios.get('http://localhost:5000/schedules/1').then(res => {
        this.advertisment_schedule.push(res.data)
      }).catch(error=>{
        console.log(error)
      })
    }
    if (this.count > 1) {
      axios.get('http://localhost:5000/schedules/2').then(res => {
        this.advertisment_schedule.push(res.data)
      }).catch(error=>{
        console.log(error)
      })
    }
 
  }

  searchbus() {
    if(this.user_id){
      alert(this.user_id)
    }
    this.search=true
    this.error = []
    this.search_results = []
    if (!this.FromLocation) this.error.push('please choose a location')
    if (!this.ToLocation) this.error.push('please chosoe a destination')
    if (!this.date) this.error.push('enter a date')
    if (this.FromLocation == this.ToLocation) {
      this.error.push('your current location and your destination can not be thesame')
    }
    if (this.error.length != 0) {
      return
    }
    this.openBusModal() 

  }

}

