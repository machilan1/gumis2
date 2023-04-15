import { Injectable } from '@nestjs/common';
import { Car } from '@gumis2/data-access';

@Injectable()
export class AppService {
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
      ],
    },
  ];

  getCars() {
    return this.cars;
  }

  getCar(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      return {};
    }

    return car;
  }

  updateCar(id: string, body: Partial<Car>) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      return {};
    }

    Object.assign(car, body);

    return car;
  }
  // createCar(body: Partial<Car>) {
  //   const car = {
  //     id: Math.random().toString(),
  //     ...body,
  //   };

  //   this.cars.push(car);

  //   return car;
  // }
}
