import { Injectable, inject } from '@angular/core';
import { Car } from '@gumis2/data-access';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class CarsService {
  http = inject(HttpClient);

  fetchCars() {
    return this.http.get<Car[]>('http://localhost:3000/api/cars');
  }
  fetchCar(id: string) {
    return this.http.get<Car>(`http://localhost:3000/api/cars/${id}`);
  }

  updateCarData(id: string, body: Partial<Car>) {
    return this.http.patch<Car>(`http://localhost:3000/api/cars/${id}`, body);
  }

  createCar(body: Partial<Car>) {
    return this.http.post<Car>(`http://localhost:3000/api/cars/new`, body);
  }
}
