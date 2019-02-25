import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from 'src/services/domain/state.service';
import { CityService } from 'src/services/domain/city.service';
import { StateDTO } from 'src/models/state.dto';
import { CityDTO } from 'src/models/city.dto';
import { UserService } from 'src/services/domain/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(private formBuilder: FormBuilder, private stateService: StateService, private cityService: CityService,
    private userService: UserService) {
    this.formGroup = this.formBuilder.group({
      name: ['Guilherme', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['guilherme@gmail.com', [Validators.required, Validators.email]],
      cpf: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      street: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['Apto 3', []],
      neighborhood: ['Copacabana', [Validators.required]],
      cep: ['10828333', [Validators.required]],
      telephone: ['977261827', [Validators.required]],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.stateService.findAll().subscribe(response => {
      this.states = response;
      this.formGroup.controls.stateId.setValue(this.states[0].id);
      this.updateCities();
    },
    error => {});
  }

  updateCities(){
    let state_id = this.formGroup.value.stateId;
    this.cityService.findCitiesByState(state_id).subscribe(response => {
      this.cities = response;
      this.formGroup.controls.cityId.setValue(null);
    },
    error => {});
  }


  signupUser(){
    this.userService.saveUser(this.formGroup.value).subscribe(response => {
      Swal.fire('Sucesso','Usuário cadastrado com sucesso','success');
    },
    error => {});
  }

}
