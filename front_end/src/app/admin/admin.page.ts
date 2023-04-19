

import { Component, OnInit } from '@angular/core';
import axios from 'axios'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  selected_button: string = 'Home'
  show_details = false
  addschedule = false;
  date = new Date()
  time = new Date()
  constructor() { }
  //users and tickets array are use to get users and tickets so that i dont have to sent so may request to the database 
  //to get the username or ticket number when need arise
users:any=[]
tickets:any=[]
  async ngOnInit() {
    this.getbuses()
   await axios.get('http://localhost:5000/users').then(res=>this.users=res.data).catch(error=>{
      console.log(error)
    })
  }
  // this 3 are for getting the passengers on a bus
  username=''
  schedule_id:number=1
  bookings:any=[]
  public buses:any = [];
  schedules:any=[];
  selected_bus: any;
  add_bus = false
  showticketsales = false
  addbus(busnumber: any) {
    this.add_bus = false

    axios.post("http://localhost:5000/buses", {
      bus_number: busnumber,
      seats: 33
    }).then(res => {
      for(let i=1;i<=res.data.seats;i++){
         axios.post(`http://localhost:5000/seats`,{
          bus_id:res.data.bus_id,
          seat_number: i,
          is_reserved:0

         }).catch(error=>{
        console.log(error)
      })
      }
    })
  this.getbuses()
  }
async getbuses() {
    this.selected_button = 'Home'
    this.addschedule = false
    this.showticketsales = false
await axios.get('http://localhost:5000/buses').then(res=>this.buses=res.data).catch(error=>{
  console.log(error)
})
  }
  get_available_seat(bus_id: number) {

  }

  async bus_details(bus: any) {
    this.addschedule = false
    this.selected_bus=bus
    this.show_details=true
this.schedule_id=0;
alert(bus.bus_id)
 await axios.get(`http://localhost:5000/admin/schedules/${bus.bus_id}`).then(res=>{
  if(res.data.length>0){
     this.schedule_id=res.data[0].schedule_id;
  }
}
   )
    .catch(error=>{
  console.log(error)
})
if(this.schedule_id==0){
  this.bookings[0]=null
return
}
 await  axios.get(`http://localhost:5000/admin/bookings/${this.schedule_id}`).then(res=>{this.bookings=res.data}).catch(error=>{
    console.log(error)
  })
  for (let p =this.bookings.length; p < 59 - this.bookings.length; p++) {
    this.bookings.push(
      null
    )
  }
    /* 1) answer to first point on project description
    to get the ticket number of passengers on a bus,
   1)get the bus_id and bus number from the bus table
   2)with the bus_id, go to the schedule table and retrive all the schedules where bus id==bus_id
   3)with bus schedule ids , go to the reservation table and retrieve the reservion id and customer id  of 
   all the passengers in this bus
   4)with the schedule id also get the cost on esch bus
   5)use the customer id to get the customer name from the customer table
   6)for ticket number,concatenate the schedule id to the booking id for every passenger on a bus
    */
 this.init_tickets(this.bookings[0].booking_id)
  }
  get_reservations() {
    this.show_details = false
    this.showticketsales = true
    this.selected_button = 'reservation'
axios.get('http://localhost:5000/admin/allschedules').then(res=>this.schedules=res.data).catch(error=>{
  console.log(error)
})

  }
 async get_ticket_sales() {
    this.show_details = false
    this.selected_button = 'ticket'
    
   await axios.get('http://localhost:5000/admin/allschedules').then(res=>this.schedules=res.data).catch(error=>{
      console.log(error)
    })
    /* this is the answer to the second point in the project description
    1) classify routes(starting point - destination), get their schedule id, use this to get their ticket cost 
    2) use their schedule ids to get number of reservations for that journey
    3)multiply the number of reservations and the ticket costfor that trip
    
    */
   this.get_sales()
    this.showticketsales=true;
  }
  show_seat_plan() {
    /*
for the third point
1)create a table with thead's = seat number , customer id 
2)get a bus id, look for the schedule id from the schedule table
3)use the schedule id to get the seat_number and customer id  from the booking table
4) contruct your table
    */
  }
  seat_availability() {
    /*
    for seat availability
  1)get the bus id
  2) use the bus id to get the schedule id
  3)use the schedule id to get the totale number of bookings for that particular schedule id
  4) if they are up to the total number of buses then red else blue
    */
  }
  show_schedule() {
    this.addschedule = !this.addschedule
  }
  async add_schedule(location: any, destination: any, fare: any) {
    
   await axios.post("http://localhost:5000/admin/add_schedule", {
      bus_id: this.selected_bus.bus_id,
      location: location,
      destination: destination,
      bus_fare: fare,
      departure_date: this.date,
      departure_time: this.time
    }).then(res => {
      
    }).catch(error=>{
      console.log(error)
    })
    this.addschedule=false
  }
  show_reservation(bus: any) {

  }
ticket=''
  get_passenger_name(i: number) {
    for (let j = 0; j < this.bookings.length; j++) {
      if (this.bookings[j]==null) {
        break
      }
      else if (this.bookings[j].seat_number == (i + 1)) {

          for(let k=0;k<this.users.length;k++){
            if(this.users[k].user_id==this.bookings[j].user_id){
              return this.users[k].fname
            }
          }
       
      }
    }
    return ''
  }
//this function takes the booking id and returns all the tickets with that booking id .
//this solves the problem of retrieving all the tickets from the data base or making so may calls to the database
async init_tickets(booking_id:number){

  }
  //FOR THE TICKET NUMBER, I WILL JUST CONCATEDNATE THE DESTINATION WITH THE SEAT NUMBER
   async get_ticket_number(i: number) {
    for (let j = 0; j < this.bookings.length; j++) {
      if (this.bookings[j]==null) {
        break
      }
      else if (this.bookings[j].seat_number == (i + 1)) {
        await axios.get(`http://localhost:5000/tickets/${this.bookings[j].booking_id}`).then(res=>this.tickets=res.data).catch(error=>{
          console.log(error)
        })
       return this.tickets[0].ticket_number
       } 
       
      }
    return ''
    
  }
//this sales varaible will hold the number of field that the schedule has been booked when i look at the bookings table and check the schedule ids
  sales:any=[]

  async get_sales(){
    for(let i=0;i<this.schedules.length;i++){
      await axios.get(`http://localhost:5000/admin/bookings/count/${this.schedules[i].schedule_id}`).then(res=>this.sales.push(res.data))
    }
     // use the id to get the count of the total number of bookings with that schedule id
     // multiply that count by the bus fare to get the total ticket sale  
  }
}
