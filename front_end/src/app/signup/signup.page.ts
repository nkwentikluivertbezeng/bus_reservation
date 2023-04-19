import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import axios from 'axios';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public route:Router) { }

  ngOnInit() {
  }
  error:string[]=[]
 async signup(fname:any,lname:any,email:any,password:any,cpassword:any,number:any){
   this.error=[]
    //create a nuw user
    // if(fname.trim()=='')this.error.push('enter first name ')
    // if(lname.trim()=='')this.error.push('enter last name ')
    
    // if(email.trim()=='')this.error.push('enter email ')
    // if(password.trim()=='')this.error.push('enter password ')
    // if(cpassword.trim()=='')this.error.push('confirm your password')
    // if(password.trim()!=cpassword.trim())this.error.push('passwords are not the same')

    // if(number.trim())this.error.push('pls enter your momo number')
    // if(number.length!=9 || number[0]!=6)this.error.push('enter a valid momo number')
    //when i get the eamil from the database i will check to see if the email is alreasdy used and choose an approapiate error massage
 if(this.error.length==0){
  //add this user to the data base
  //validate the email and password if you have time
 await   axios.post("http://localhost:5000/users",
     {lname:lname,fname:fname,email:email,password:password,phone_number:number})
     .then((response) => {
          if(response.data==null){

            alert("this email has already been used")
            return;
          }
          alert("account creeated")
          this.route.navigateByUrl('signin')
    })
      
 
 }
  }
}
