import { Car, Equipment } from '@gumis2/data-access';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CarsService } from './cars.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Param } from '@nestjs/common';

interface DisplayCarsState {
  loading: boolean;
  cars: Car[];
  selectedCar?: Car;
  selectedCarId?: string;
}

const initialState: DisplayCarsState = {
  selectedCar: undefined,
  loading: false,
  cars: [],
};
@Injectable({ providedIn: 'root' })
export class DisplayCarsStore extends ComponentStore<DisplayCarsState> {
  carsService = inject(CarsService);
  readonly cars$ = this.select((state) => state.cars);
  readonly selectedId$ = this.select((state) => state.selectedCarId);
  readonly selectedCar$ = this.select(
    this.cars$,
    this.selectedId$,
    (cars, selectedId) => {
      return cars.find((car) => car.id === selectedId);
    }
  );
  // readonly selectedCar$ = this.select((state) => state.selectedCar);
  readonly length$ = this.select((state) => state.cars.length);
  readonly loading$ = this.select((state) => state.loading);
  readonly body$ = this.select((state) => state.selectedCar);
  readonly vm$ = this.select({
    selectedCar: this.selectedCar$,
    cars: this.cars$,
    loading: this.loading$,
  });
  constructor() {
    super(initialState);
  }

  readonly fetchCars = this.effect((trigger$: Observable<void>) => {
    // console.log('fetchCars');
    return trigger$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.carsService.fetchCars().pipe(
          tapResponse(
            (cars) => this.patchState({ cars, loading: false }),
            (err) => {
              this.patchState({ loading: false });
              alert('No cars');
            }
          )
        )
      )
    );
  });

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
  // readonly updateCar = this.effect((body: Observable<Partial<Car>>) => {
  //   return this.selectedCar$.pipe(
  //     tap(() => this.patchState({ loading: true })),
  //     switchMap((car) =>
  //       this.carsService.updateCarData(car.id, body).pipe(
  //         tapResponse(
  //           (car) => this.patchState({ selectedCar: car, loading: false }),
  //           (err) => {
  //             alert(err);
  //             this.patchState({ loading: false });
  //           }
  //         )
  //       )
  //     )
  //   );
  // });

  //   readonly createCar = this.effect((car: Partial<Car>) => {
  //     return this.carsService.createCar(car).pipe(
  //       tapResponse(
  //         (car) => this.patchState({ cars: [...this.getValue().cars, car] }),
  //         (err) => {
  //           alert(err);
  //         }
  //       )
  //     );
  //   });
  // }
  //todo  editCar(id: string,edits: Partial<Car>)
}
