import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  saveUser(user: any) {
    return this.http.post(`${API_CONFIG.baseUrl}/users`,user,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}
