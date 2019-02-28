import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from 'src/pages/home/home.module';
import { Error404Component } from 'src/pages/error404/error404.component';
import { LoginModule } from 'src/pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SignupModule } from 'src/pages/signup/signup.module';
import { ErrorInterceptorProvider } from 'src/interceptors/interceptor-error';
import { AuthInterceptorProvider } from 'src/interceptors/interceptor-auth';




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
    CommonModule,
    SignupModule,
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
