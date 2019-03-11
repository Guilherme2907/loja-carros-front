import { Component, OnInit } from '@angular/core';
import { CarDTO } from 'src/models/car.dto';
import { CarService } from 'src/services/domain/car.service';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { UserService } from 'src/services/domain/user.service';

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
  profiles: string[] = [];
  pages: number = 0;
  elementsPerPage = 10;


  constructor(private carService: CarService, private storageService: StorageService, private userService: UserService) { }

  ngOnInit() {
    this.carService.FindAllCars().subscribe(response => {
      this.cars = response;
      this.fillInCarData(this.cars);
      this.findUserByEmail();
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
      error => { });
  }

  findUserByEmail() {
    let user = this.storageService.getLocalUser();
    this.userService.findByEmail(user.email).subscribe(response => {
      this.profiles = response['profiles'];
      console.log(this.profiles);
    },
    error => { });
  }
}
