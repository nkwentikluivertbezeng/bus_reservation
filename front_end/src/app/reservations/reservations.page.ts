import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import axios from 'axios';
import { error } from 'console';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  constructor(public datepipe:DatePipe,private alertController: AlertController) { }

  ngOnInit() {
    this.get_my_reservations()
  }




  async presentAlert(i:number) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message:'are you sure you want to delete this reservation?? this action cannot be reversed',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',   
        },
        {
          text: 'delete',
          role: 'destructive',
          handler: () => {
            axios.delete(`http://localhost:5000/bookings/${i}`).then(res=>console.log(res)).catch(error=>console.log(error))
            this.my_reservations.splice(0,1)
          },
        },
      ],
      cssClass: 'alertCustomCss'
    });

    await alert.present();

  }
  
  

async showalert(i:number){
  const alert= await this.alertController.create({
    header:'info',
    message:`route:${this.schedules[i].location}-${this.schedules[i].destination} <br>depature date:${this.schedules[i].departure_time}
     
     `,
    buttons:['OK']
  })
  await alert.present()
}
schedules:any=[]
show_reservations=false
  my_reservations:any=[]
 async get_my_reservations(){ 
  await axios.get('http://localhost:5000/reservation/booking',{
  params:{
    user_id:1
  }
  }
  ).then(res=>{
    this.my_reservations=res.data
  })

  for(let i=0;i<this.my_reservations.length;i++){
   await axios.get(`http://localhost:5000/schedules/${this.my_reservations[i].schedule_id}`).then(res=>{
      this.schedules.push(res.data)
    })
  }
console.log(this.schedules)
this.show_reservations=true;
  }
  get_route(id:number){
    alert("this function has been called")
    var schedule= this.schedules.find((schedule: { schedule_id: number; })=>schedule.schedule_id=id)
    console.log(schedule)
    this.show_reservations=true
    return schedule.location +" - " + schedule.destination
    
  }
  show_details(i:number){
    //depature time
    //fromv-to
    //number of seats booked
    //depature date
    this.showalert(i)
  }
  delete_reservation(i:number){
    //use the reservation id to delete that reservation
  this.presentAlert(i)
  }
}
