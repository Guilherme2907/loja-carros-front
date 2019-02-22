import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from 'src/pages/home/home.module';
import { Error404Component } from 'src/pages/error404/error404.component';
import { LoginModule } from 'src/pages/login/login.module';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SignupModule } from 'src/pages/signup/signup.module';




@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    SignupModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
