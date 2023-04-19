import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'login', url: '/login', icon: 'log-in' },
    {title:'my reservations',url:'/reservations',icon:'book'}
  ];

  constructor() {}
}
