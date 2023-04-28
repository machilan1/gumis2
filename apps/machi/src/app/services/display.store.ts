import { Injectable, inject } from '@angular/core';
import { Car } from '@gumis2/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { CarsService2 } from './car2-service';

interface DisplayState {
  loadingCars: boolean;
  cars: Car[];
  deletingCar: boolean;
}

const initialState: DisplayState = {
  loadingCars: false,
  cars: [],
  deletingCar: false,
};

@Injectable()
export class DisplayStore extends ComponentStore<DisplayState> {
  private CarService = inject(CarsService2);

  constructor() {
    super(initialState);
  }
  // define the thing you need for redering
  readonly cars$ = this.select((state) => state.cars);
  readonly loadingCars$ = this.select((state) => state.loadingCars);
  readonly vm$ = this.select({
    cars: this.cars$,
    loadingCars: this.loadingCars$,
  });

  // define actions that changes states

  readonly fetchCars = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.patchState({ loadingCars: true })),
      switchMap(() =>
        this.CarService.fetchCars().pipe(
          tapResponse(
            (cars) => this.patchState({ loadingCars: false, cars: cars }),
            () => alert('No car is fetched.')
          )
        )
      )
    );
  });

  readonly deleteCar = this.effect((carId$: Observable<string>) => {
    return carId$.pipe(
      tap(() => this.patchState({ deletingCar: true })),
      switchMap((id) =>
        this.CarService.deleteCar(id).pipe(
          tapResponse(
            () => {
              this.patchState({ deletingCar: false });
            },
            (err) => {
              this.patchState({ deletingCar: false });
              console.log(err);
            }
          )
        )
      )
    );
  });
}
