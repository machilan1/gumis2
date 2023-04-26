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
    console.log(id);
    this.cars.splice(
      this.cars.findIndex((x) => x.id === id),
      1
    );
    return id;
  }
}
