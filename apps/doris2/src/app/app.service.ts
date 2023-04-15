import { Injectable } from '@nestjs/common';
import { Car } from '@gumis2/data-access';

@Injectable()
export class AppService {
  cars: Car[] = [
    {
      id: '1',
      make: 'Ford',
      model: 'Fusion',
      year: 2018,
      color: 'Dark Grey',
      price: 20000,
      image:
        'https://hips.hearstapps.com/hmg-prod/images/2020-ford-fusion-mmp-1-1568742907.jpeg?crop=0.643xw:0.541xh;0.316xw,0.429xh&resize=1200:*',
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
      color: 'Pitch Black',
      price: 50000,
      image: 'https://cdn.motor1.com/images/mgl/y2mbjm/s3/tesla-model-3.webp',
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
    console.log('Cars Fetched');
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
