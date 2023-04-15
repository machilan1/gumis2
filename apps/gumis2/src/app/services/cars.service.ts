import { Injectable, inject } from '@angular/core';
import { Car } from '@gumis2/data-access';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CarsService {
  http = inject(HttpClient);
  cars: Car[] = [
    {
      id: '1',
      make: 'Ford',
      model: 'Fusion',
      year: 2019,
      color: 'red',
      price: 20000,
      equipments: [
        {
          id: '1',
          name: 'Leather seats',
          price: 1000,
        },
        {
          id: '2',
          name: 'Autopilot',
          price: 10000,
        },
      ],
    },
    {
      id: '2',
      make: 'Tesla',
      model: 'Model 3',
      year: 2019,
      color: 'red',
      price: 50000,
      equipments: [
        {
          id: '1',
          name: 'Leather seats',
          price: 1000,
        },
        {
          id: '2',
          name: 'Autopilot',
          price: 10000,
        },
        {
          id: '3',
          name: 'Glass roof',
          price: 5000,
        },
      ],
    },
  ];

  fetchCars() {
    return this.http.get<Car[]>('http://localhost:3000/cars');
  }
  fetchCar(id: string) {
    return this.http.get<Car>(`http://localhost:3000/cars/${id}`);
  }

  updateCarData(id: string, body: Partial<Car>) {
    return this.http.patch<Car>(`http://localhost:3000/cars/${id}`, body);
  }

  createCar(body: Partial<Car>) {
    return this.http.post<Car>(`http://localhost:3000/cars`, body);
  }
}
