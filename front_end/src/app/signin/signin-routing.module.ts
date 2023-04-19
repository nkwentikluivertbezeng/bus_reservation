import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninPage } from './signin.page';

const routes: Routes = [
  {
    path: '',
    component: SigninPage
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('../signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninPageRoutingModule {}
