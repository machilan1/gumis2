import { Car, Equipment } from '@gumis2/data-access';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CarsService } from './cars.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface DisplayCarsState {
  loading: boolean;
  cars: Car[];
  selectedCar?: Car;
  equipments?: Equipment[];
  selectedEquipment?: Equipment;
}

const initialState: DisplayCarsState = {
  loading: false,
  cars: [],
};
@Injectable({ providedIn: 'root' })
export class DisplayCarsStore extends ComponentStore<DisplayCarsState> {
  carsService = inject(CarsService);
  readonly cars$ = this.select((state) => state.cars);
  readonly selectedCar$ = this.select((state) => state.selectedCar);
  readonly selectedEquipment$ = this.select((state) => state.selectedEquipment);
  readonly equipments$ = this.select((state) => state.equipments);
  readonly loading$ = this.select((state) => state.loading);
  readonly vm$ = this.select({
    selectedCar: this.selectedCar$,
    selectedEquipment: this.selectedEquipment$,
    equipments: this.equipments$,
    cars: this.cars$,
    loading: this.loading$,
  });
  constructor() {
    super(initialState);
  }

  readonly fetchCars = this.effect(() => {
    return this.carsService.fetchCars().pipe(
      tapResponse(
        (cars) => this.patchState({ cars, loading: false }),
        (err) => {
          this.patchState({ loading: false });
          alert('No cars');
        }
      )
    );
  });

  readonly fetchCar = this.effect<string>((id$) => {
    return id$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((id) => this.carsService.fetchCar(id)),
      tapResponse(
        (car) => this.patchState({ selectedCar: car, loading: false }),
        (err) => {
          this.patchState({ loading: false });
          alert(err);
        }
      )
    );
  });

  readonly updateCar = this.effect(
    (selectedCarID: string, body: Partial<Car>) => {
      return selectedCar$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((car) => this.carsService.updateCarData(car.id, body)),
        tapResponse(
          (car) => this.patchState({ selectedCar: car, loading: false }),
          (err) => {
            alert(err);
            this.patchState({ loading: false });
          }
        )
      );
    }
  );

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
