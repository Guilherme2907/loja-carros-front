import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDTO } from 'src/models/city.dto';
import { API_CONFIG } from 'src/config/api.config';
import { CarDTO } from 'src/models/car.dto';


@Injectable({
    providedIn: 'root'
})
export class CarService {

    constructor(private http: HttpClient) {

    }

    FindAllCars(): Observable<CarDTO[]> {
        return this.http.get<CarDTO[]>(`${API_CONFIG.baseUrl}/cars`);
    }

    FindAllPage(search: string,pages:number,elementsPerPage:number): Observable<CarDTO[]> {
        return this.http.get<CarDTO[]>(`${API_CONFIG.baseUrl}/cars/page/?brand=${search}&pages=${pages}&elementsPerPage=${elementsPerPage}`);
    }

}
