import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { CANSOComponent } from 'src/app/auth/canso/canso.component';

const routes: Routes = [
  { 
    path: "", 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: "login", component: LoginComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: "canso", component: CANSOComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
