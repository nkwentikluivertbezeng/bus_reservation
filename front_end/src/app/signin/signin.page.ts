import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(private router: Router) { }
  showPassword = false;

  ngOnInit() {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  async login(email: any, password: any) {
   if(password.trim()==''){
    return
   }
   if(email.trim()==''){
    return
   }
   await axios.get(`http://localhost:5000/authenticate`,
   {
    params:{
      email:email,
      password:password
    }
   }).then(res => {
    if(res.data==false){
      alert("email or password is incorrect")
      return
    }
    if ( email=='admin@gmail.com') {
      this.router.navigate(['admin'],{queryParams:{user_id:res.data.user_id}});
    }
    else{
      alert("login successfull")
      this.router.navigate(['home'],{queryParams:{user_id:res.data.user_id}});
    }

});

  }
}
