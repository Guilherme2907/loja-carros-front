import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { UniquePipe } from 'src/app/unique-pipe.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    UniquePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class HomeModule { }
