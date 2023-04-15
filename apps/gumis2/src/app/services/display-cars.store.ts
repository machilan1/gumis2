import { Car, Equipment } from '@gumis2/data-access';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CarsService } from './cars.service';
import { tap } from 'rxjs/operators';

interface DisplayCarsState {
  loading: boolean;
  cars: Car[];
  selectedCar?: string;
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

  readonly fetchCars = this.effect<void>(() => {
    this.patchState({ loading: true });
    return this.carsService.fetchCars().pipe(
      tapResponse(
        (cars) => this.patchState({ cars, loading: false }),
        (err) => {
          alert(err);
          this.patchState({ loading: false });
        }
      )
    );
  });

  readonly fetchCar = this.effect<string>((id$) => {
    this.patchState({ loading: true });
    return id$.pipe();
  });
}
