import { Component, OnInit } from '@angular/core';
import { CarDTO } from 'src/models/car.dto';
import { CarService } from 'src/services/domain/car.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: CarDTO[];
  vehicleTypes: string[] = [];
  years: string[] = [];
  brands: string[] = [];
  search: string = "";
  pages: number = 0;
  elementsPerPage = 10;


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.FindAllCars().subscribe(response => {
      this.cars = response;
      this.fillInCarData(this.cars);
    },
      error => { });
  }

  searchCar() {
    this.carService.FindAllPage(this.search, this.pages, this.elementsPerPage).subscribe(response => {
      this.cars = response['content'];
    },
      error => { });
  }

  fillInCarData(cars: CarDTO[]) {
    for (var i = 0; i < cars.length; i++) {
      this.vehicleTypes[i] = cars[i].vehicleType;
      this.years[i] = cars[i].year;
      this.brands[i] = cars[i].brand;
    }
  }

  filterCars(form: any | FormGroup) {
    let types: string = '';
    let years: string = '';
    let brands: string = '';
    for (const field in form.controls) {
      const control = form.controls[field];
      if (control.value === true && field.startsWith('t')) {
        types = types + ',' + field.substring(1);
      } else if ((control.value === true && field.startsWith('y'))) {
        years = years + ',' + field.substring(1);
      } else if ((control.value === true && field.startsWith('b'))) {
        brands = brands + ',' + field.substring(1);
      }
    }
    this.carService.searchCars(brands, years, types, this.pages, this.elementsPerPage).subscribe(response => {
      this.cars = response['content'];
    },
    error => {});
  }
}
