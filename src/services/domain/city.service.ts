import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDTO } from 'src/models/city.dto';
import { API_CONFIG } from 'src/config/api.config';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {

  }

  findCitiesByState(state_id: string) : Observable<CityDTO[]>{
    return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${state_id}/cities`);
  }

}
