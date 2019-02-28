import { Component, OnInit } from '@angular/core';
import { CarDTO } from 'src/models/car.dto';
import { CarService } from 'src/services/domain/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: CarDTO[];
  search: string = "";
  pages: number = 0;
  elementsPerPage = 10;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.FindAllCars().subscribe(response => {
      this.cars = response;
    },
      error => { });
  }

  searchCar() {
    this.carService.FindAllPage(this.search,this.pages,this.elementsPerPage).subscribe(response => {
      this.cars = response['content'];
    },
      error => { });
  }


}
