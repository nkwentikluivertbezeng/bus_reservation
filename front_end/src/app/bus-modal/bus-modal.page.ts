import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Mousewheel]);
@Component({
  selector: 'app-bus-modal',
  templateUrl: './bus-modal.page.html',
  styleUrls: ['./bus-modal.page.scss'],
})
export class BusModalPage implements OnInit {
  selectedLocation: string = '';
  selectedDestination: string = '';
  error: any[] = [];
  search_results: any[] = [];
  date: Date = new Date()
  user_id: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router : Router
  ) { }

  ngOnInit() {
    this.selectedLocation = this.navParams.get('selectedLocation');
    this.selectedDestination = this.navParams.get('selectedDestination');
    this.date = new Date(this.navParams.get('date'))
    this.user_id=this.navParams.get('user_id')
    axios.get("http://localhost:5000/schedules", {
      params: {
        starting_point: this.selectedLocation,
        destination: this.selectedDestination,
        // departure_date: this.date
      }
    }).then(res => {
      this.search_results = res.data;

    }).catch(error => {
      console.log(error)
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }
  getRoute(schedule: any) {
    return `${schedule.location + ' - ' + schedule.destination}`
  }

  getprice(schedule: any) {
    return schedule.bus_fare
  }
  getTime(schedule: any) {
    return `${schedule.departure_time}`
  }
  book(id:number){
    this.router.navigate(['/booking', { id2: id ,user_id:this.user_id}]);
   this.dismiss()
  }
}
