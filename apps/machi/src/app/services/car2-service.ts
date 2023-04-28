import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '@gumis2/data-access';

@Injectable({ providedIn: 'root' })
export class CarsService2 {
  private http = inject(HttpClient);

  fetchCars() {
    return this.http.get<Car[]>('http://localhost:3000/api/cars');
  }
  fetchCar(id: string) {
    return this.http.get<Car>(`http://localhost:3000/api/cars/${id}`);
  }

  createCar(body: Partial<Car>) {
    return this.http.post(`http://localhost:3000/api/cars/new`, body);
  }

  updateCar(id: string, body: Partial<Car>) {
    return this.http.patch(`http://localhost:3000/api/cars/${id}`, body);
  }

  deleteCar(id: string) {
    return this.http.post(`http://localhost:3000/api/cars/delete`, { id: id });
  }
}
