import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { CarDTO } from 'src/models/car.dto';


@Injectable({
    providedIn: 'root'
})
export class CarService {

    constructor(private http: HttpClient) {

    }

    saveCar(car: CarDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/cars`, car,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    findCarById(id: string): Observable<CarDTO> {
        return this.http.get<CarDTO>(`${API_CONFIG.baseUrl}/cars/${id}`);
    }

    findAllCars(): Observable<CarDTO[]> {
        return this.http.get<CarDTO[]>(`${API_CONFIG.baseUrl}/cars`);
    }

    findAllPage(search: string, pages: number, elementsPerPage: number): Observable<CarDTO[]> {
        return this.http.get<CarDTO[]>(`${API_CONFIG.baseUrl}/cars/page/?pages=${pages}&elementsPerPage=${elementsPerPage}`);
    }

    searchCars(brand: string, year: string, type: string, pages: number, elementsPerPage: number): Observable<CarDTO[]> {
        return this.http.get<CarDTO[]>(`${API_CONFIG.baseUrl}/cars/search/?pages=${pages}&elementsPerPage=${elementsPerPage}
        &brand=${brand}&year=${year}&vehicleType=${type}`);
    }

    updateCar(car: CarDTO, id: string): Observable<{}> {
        return this.http.put(`${API_CONFIG.baseUrl}/cars/${id}`, car);
    }

    deleteCar(id: string): Observable<{}> {
        return this.http.delete(`${API_CONFIG.baseUrl}/cars/${id}`, httpOptions);
    }

    createOrClearCar(): CarDTO {
        let car: CarDTO = { id: "", vehicleType: "", brand: "", model: "", year: "", price: 0, image: "" };
        return car;
    }
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
