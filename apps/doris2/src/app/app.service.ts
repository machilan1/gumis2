import { Injectable } from '@nestjs/common';
import { Car } from '@gumis2/data-access';
import { of } from 'rxjs';

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
          equPrice: 1000,
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
          equPrice: 1000,
        },
        {
          id: '2',
          name: 'Autopilot',
          equPrice: 10000,
        },
      ],
    },
    {
      id: '3',
      make: 'Mercedes Benz',
      model: 'AMG GT63 S',
      year: 2023,
      color: 'White',
      price: 700000,
      image:
        'https://carwow-uk-wp-2.imgix.net/GT-driving-front.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=60&w=750',
      equipments: [
        {
          id: '1',
          name: 'Leather seats',
          equPrice: 1000,
        },
        {
          id: '2',
          name: 'Autopilot',
          equPrice: 10000,
        },
        {
          id: '3',
          name: 'AMG Performance Exhaust',
          equPrice: 10000,
        },
      ],
    },
    {
      id: '4',
      make: 'Recyculus',
      model: 'Junk200 hybrid',
      year: 1989,
      color: 'White',
      price: 300,
      image:
        'data:image/jpeg;base64,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',
      equipments: [
        {
          id: '1',
          name: 'Squeaky leather seats',
          equPrice: 1000,
        },
        {
          id: '2',
          name: 'Homeless body kit',
          equPrice: 100,
        },
        {
          id: '3',
          name: 'Polyester windshield',
          equPrice: 33,
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
    console.log(`Car (ID = ${id}) info updated`);
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      return {};
    }
    Object.assign(car, body);
    return car;
  }
  addCar(body: Partial<Car>) {
    console.log('Some car has been added to the list');
    const car = {
      id: '',
      make: '',
      model: '',
      year: 0,
      color: '',
      price: 0,
      image: '',
      equipments: [],
    };
    Object.assign(car, body);

    this.cars.push(car);

    return car;
  }

  deleteCar(id: string) {
    const index = this.cars.findIndex((x) => x.id === id);
    this.cars.splice(index, 1);
    console.log(id);
    return of(id);
  }
}
