import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StorageService } from '../storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialsDTO } from 'src/models/credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private storageService: StorageService) {

  }

  authenticate(creds: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulAuth(token: string) {
    let tok = token.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    }
    this.storageService.setLocalUser(user);
  }

  refreshToken() {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
