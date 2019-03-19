import { Component, OnInit } from '@angular/core';
import { CarDTO } from 'src/models/car.dto';
import { CarService } from 'src/services/domain/car.service';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { UserService } from 'src/services/domain/user.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  cars: CarDTO[];
  formGroup: FormGroup;
  car: CarDTO;
  vehicleTypes: string[] = [];
  years: string[] = [];
  brands: string[] = [];
  search: string = "";
  profiles: string[] = [];
  pages: number = 0;
  elementsPerPage = 10;



  constructor(private carService: CarService, private storageService: StorageService, private userService: UserService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.carService.findAllCars().subscribe(response => {
      this.cars = response;
      this.fillInCarData(this.cars);
      this.getUserProfiles();
    },
      error => { });
  }

  searchCar() {
    this.carService.findAllPage(this.search, this.pages, this.elementsPerPage).subscribe(response => {
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

  getUserProfiles() {
    let user = this.storageService.getLocalUser();
    this.userService.findByEmail(user.email).subscribe(response => {
      this.profiles = response['profiles'];
    },
      error => { });
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

  deleteCar(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Tem certeza que deseja deletar esse carro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim,deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.carService.deleteCar(id).subscribe(response => {
          Swal.fire(
            'Deletado!',
            'Carro deletado com sucesso',
            'success'
          )
          this.ngOnInit();
        },
          error => { });
      }
    })
  }

  open(modalUpdate, id) {
    this.modalService.open(modalUpdate);
    this.carService.findCarById(id).subscribe(response => {
      this.car = response;
    });
  }


  updateCar() {
    this.carService.updateCar(this.car, this.car.id).subscribe(response => {
      this.ngOnInit();
      this.modalService.dismissAll();
      Swal.fire('','Carro atualizado com sucesso','success');
    },
      error => { });
  }
}
