import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';
import { CredentialsDTO } from 'src/models/credentials.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.refreshToken().subscribe(response => {
      this.authService.successfulAuth(response.headers.get("Authorization"));
      this.router.navigate(['home']);
    },
    error => {})
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.successfulAuth(response.headers.get("Authorization"));
      this.router.navigate(['home']);
    },
    error => {})
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}