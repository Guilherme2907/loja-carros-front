import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StateService } from 'src/services/domain/state.service';
import { CityService } from 'src/services/domain/city.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private formBuilder: FormBuilder,private stateService: StateService,private cityService: CityService) { 
    this.formGroup = this.formBuilder.group({
      
    });
  }

  ngOnInit() {
  }



}
