import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  showseatplan = false
  error: string[] = []
  seats: any = [];
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  schedule_id!: string
  fare_ammount: number = 0
  booking_date = new Date
  user:any
  total_ammount: number = 0
  bus_id: any
  selected_seats: number[] = []
  user_id:any
  async ngOnInit() {
    this.schedule_id = this.activatedRoute.snapshot.paramMap.get('id2') as string;
    this.user_id=parseInt(this.activatedRoute.snapshot.paramMap.get('user_id') as string);
    await axios.get(`http://localhost:5000/schedules/${this.schedule_id}`).then(res => {
      this.bus_id = res.data.bus_id;
    }).catch(error => {
      console.log(error)
    })
    await axios.get(`http://localhost:5000/users/${this.user_id}`).then(res=>this.user=res.data)
    this.disable_selected_seats()
  }

  async payment() {
    var bus_id;
    this.get_fare_ammount()
    if (this.selected_seats.length == 0) {
      alert(this.selected_seats.length)
     alert('you must choose at least one seat')
     return
    }
    // if(this.user.number.toString.length!=9)this.error.push('enter a valid momo number')
// this is  to create bookings for all the seats the user selected
      for (let i = 0; i < this.selected_seats.length; i++) {
        await axios.post('http://localhost:5000/bookings', {
          schedule_id: this.schedule_id,
          user_id: this.user_id,
          booking_date: new Date(),
          seat_number: this.selected_seats[i] + 1

        })
        //this is to get the bus id of the current schedule
        await axios.get(`http://localhost:5000/schedules/${this.schedule_id}`).then(res=>bus_id=res.data.bus_id)
//
// getting all the seats of the bus the user has selected bc thats what i wiill user to show that the seat has been taken
        alert(this.selected_seats[i])
        axios.get('http://localhost:5000/booking/seats', {
          params: {
            bus_id: bus_id,
            seat_number: this.selected_seats[i]
          }
        }).then(res => axios.put('http://localhost:5000/seats', {
          seat_id: res.data.seat_id
        }).then(res => console.log(res)).catch(error => console.log(error))


        ).catch(error => console.log(error))
      }
    alert("booking successfull")
    this.router.navigate(['home'],{queryParams:{user_id:this.user_id}});
  }
  get_fare_ammount() {
    //get fare ammount using the schedule_id
    //for now let us asume fare to be 5000frs

    this.fare_ammount = 5000

    this.total_ammount = this.fare_ammount * this.selected_seats.length
  }
  check_seat(num: number) {
    console.log(num)
    if (this.selected_seats.find(p => p == num)) {
      this.selected_seats.splice(this.selected_seats.indexOf(num), 1)
      alert("removing")
      alert(this.selected_seats)
    }
    else {
      this.selected_seats.push(num)
      alert("addind")
      alert(this.selected_seats)
    }

  }
  style(num: number): boolean {
    return this.selected_seats.find(p => p == num) ? true : false
  }
  async disable_selected_seats() {
    await axios.get(`http://localhost:5000/seats/${this.bus_id}`).then(res => {
      this.seats = res.data;
      console.log(this.seats)
    }).catch(error => {
      console.log(error)
    })
    this.showseatplan = true

  }
}

