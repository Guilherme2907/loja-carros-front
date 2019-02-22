import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/pages/home/home.component';
import { Error404Component } from 'src/pages/error404/error404.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { AuthGuardService } from 'src/services/auth/authguard.service';
import { SignupComponent } from 'src/pages/signup/signup.component';

const routes : Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Error404Component }
]

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
