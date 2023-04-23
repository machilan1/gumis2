import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DisplayCarsStore } from '../services/display-cars.store';
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { informationCarStore } from '../services/information-car.store';
import { provideComponentStore } from '@ngrx/component-store';
import { CarsService } from '../services/cars.service';
import { Car } from '@gumis2/data-access';
@Component({
  selector: 'gumis2-information-car',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <h1 class="text-4xl text-center py-6">Edit Car Informations</h1>
    <ng-container
      *ngIf="{
        selectedCar: selectedCar$ | async,
        loading: loading$ | async
      } as vm"
    >
      <div class="w-full flex flex-col items-center">
        <ng-container *ngIf="vm.selectedCar">
          <div>12312312312</div>
          <img class="w-2/5" [src]="vm.selectedCar.image" alt="Car photo" />
        </ng-container>
        <form [formGroup]="form" class="flex flex-col" (ngSubmit)="onSave()">
          <p>Maker</p>
          <input type="text" formControlName="make" value="123" />
          <p>Model</p>
          <input type="text" formControlName="model" />
          <p>Year</p>
          <input type="text" formControlName="year" />
          <p>Color</p>
          <input type="text" formControlName="color" />
          <p>Price</p>
          <input type="text" formControlName="price" />
          <!-- todo Fix the null problem -->
          <ng-container *ngIf="vm.selectedCar!.equipments.length > 0">
            <p>Equipments</p>
          </ng-container>

          <div class="flex justify-between py-4">
            <button
              [routerLink]="['/cars']"
              type="button"
              class="bg-red-400 h-8 w-fit px-4 my-4 self-end text-gray-800 rounded-full cursor-pointer hover:bg-red-200 "
            >
              Discard Changes
            </button>
            <button
              (click)="onSave()"
              [routerLink]="['/cars']"
              type="submit"
              class="bg-blue-400 h-8 w-fit px-4 my-4 self-end text-gray-800 rounded-full cursor-pointer hover:bg-blue-200 "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ng-container>
  `,
  styles: [
    `
      form {
        margin: 0 2rem;
      }
      form > p {
        padding-top: 0.5rem;
        font-size: 2rem;
      }
      form > input {
        padding-left: 0.3rem;
        width: 20rem;
        background-color: #f2f2f2;
        border: 1px solid grey;
      }
    `,
  ],
  providers: [provideComponentStore(informationCarStore)],
})
export class InformationCarComponent implements OnInit {
  route = inject(ActivatedRoute);
  informationCarStore = inject(informationCarStore);
  carService = inject(CarsService);
  selectedcar!: Car;

  form = new FormGroup({
    make: new FormControl('', { nonNullable: true }),
    model: new FormControl('', { nonNullable: true }),
    year: new FormControl(0, { nonNullable: true }),
    color: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    equipment: new FormArray([]),
  });

  loading$ = this.informationCarStore.loading$;
  selectedCar$ = this.informationCarStore.selectedCar$.pipe(
    tap((car) => this.form.patchValue(car)),
    tap((car) => (this.selectedcar = car))
  );

  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.informationCarStore.selectCar(params['id']);
      console.log('params: ', params['id']);
    });
  }

  onSave() {
    console.log('Saving');
    this.informationCarStore.updateCar(this.form.value);
  }
}
