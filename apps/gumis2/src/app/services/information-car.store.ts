import { Injectable, inject } from '@angular/core';
import { Car } from '@gumis2/data-access';
import { CarsService } from './cars.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface InformationCarState {
  loading: boolean;
  selectedCar: Car;
  formBody: Car;
}

const initialState: InformationCarState = {
  loading: false,
  selectedCar: {
    id: 'string',
    make: 'string',
    model: 'string',
    year: 0,
    color: 'string',
    price: 0,
    image: 'string',
    equipments: [],
  },
  formBody: {
    id: 'string',
    make: 'string',
    model: 'string',
    year: 0,
    color: 'string',
    price: 0,
    image: 'string',
    equipments: [],
  },
};

@Injectable()
export class informationCarStore extends ComponentStore<InformationCarState> {
  carsService = inject(CarsService);
  constructor() {
    super(initialState);
  }

  readonly selectedCar$ = this.select((state) => state.selectedCar);
  readonly formBody$ = this.select((state) => state.formBody);
  readonly loading$ = this.select((state) => state.loading);

  readonly selectCar = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((userId) =>
        this.carsService.fetchCar(userId).pipe(
          tapResponse(
            (car) => {
              this.patchState({ selectedCar: car, loading: false });
              console.log(car);
            },
            (err) => {
              this.patchState({ loading: false });
              alert('No car is loaded');
            }
          )
        )
      )
    );
  });

  readonly updateCar = this.effect((formContent$: Observable<Partial<Car>>) => {
    return formContent$.pipe(
      tap(console.log),
      tap(() => this.patchState({ loading: true })),
      switchMap((formContent) =>
        this.selectedCar$.pipe(
          map((car) => car.id),
          switchMap((id) =>
            this.carsService.updateCarData(id, formContent).pipe(
              tapResponse(
                () => this.patchState({ loading: false }),
                () => {
                  this.patchState({ loading: false });
                  alert('No car is updated');
                }
              )
            )
          )
        )
      )
    );
  });

  // todo 新增車輛的effect

  readonly createCar = this.effect((formContent$: Observable<Partial<Car>>) => {
    return formContent$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((formContent) =>
        this.carsService.createCar(formContent).pipe(
          tapResponse(
            () => this.patchState({ loading: false }),
            () => {
              this.patchState({ loading: false });
              alert('No car is created');
            }
          )
        )
      )
    );
  });
}
