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
import { map, take, tap } from 'rxjs/operators';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { informationCarStore } from '../services/information-car.store';
import { provideComponentStore } from '@ngrx/component-store';
import { CarsService } from '../services/cars.service';
import { Car } from '@gumis2/data-access';
@Component({
  selector: 'gumis2-add-car',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <h1 class="text-4xl text-center py-6">Add a new car</h1>
    <ng-container
      *ngIf="{
        img: img$ | async,
        loading: loading$ | async,
        length: length$ | async
      } as vm"
    >
      <div class="w-full flex flex-col items-center">
        <img class="w-2/5" [src]="vm.img" alt="Car photo" />

        <form [formGroup]="form" class="flex flex-col">
          <p>ID : {{ vm.length! + 1 }} (自動產生)</p>

          <p>Image</p>
          <input
            type="text"
            placeholder="Enter image URL"
            formControlName="image"
          />
          <p>Maker</p>
          <input type="text" formControlName="make" />
          <p>Model</p>
          <input type="text" formControlName="model" />
          <p>Year</p>
          <input type="text" formControlName="year" />
          <p>Color</p>
          <input type="text" formControlName="color" />
          <p>Price</p>
          <input type="text" formControlName="price" />
          <p>Equipments</p>
          <div formArrayName="equipments">
            <ng-container
              *ngFor="
                let equipment of getEquipmentControls().controls;
                let i = index
              "
            >
              <div [formGroupName]="i" class="block equip my-4">
                <input
                  type="text"
                  class="bg-slate-300 text-center w-6 "
                  formControlName="id"
                />
                <input
                  type="text"
                  class="bg-slate-300 mx-2 px-2 w-64"
                  formControlName="name"
                />
                <input
                  type="text"
                  class="bg-slate-300 mx-2 w-fit"
                  formControlName="equPrice"
                />
              </div>
            </ng-container>
            <button type="button" (click)="onAddEquipment()">
              Add equipment
            </button>
          </div>

          <div class="flex justify-between py-4">
            <button
              [routerLink]="['/cars']"
              type="button"
              class="bg-red-400 h-8 w-fit px-4 my-4 self-end text-gray-800 rounded-full cursor-pointer hover:bg-red-200 "
            >
              Cancel
            </button>
            <button
              (click)="onCreate()"
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
        border-radius: 0.2rem;
        background-color: #f2f2f2;
        border: 1px solid grey;
      }
    `,
  ],
  providers: [provideComponentStore(informationCarStore)],
})
export class AddCarComponent implements OnInit {
  route = inject(ActivatedRoute);
  informationCarStore = inject(informationCarStore);
  carService = inject(CarsService);
  desplayCarStore = inject(DisplayCarsStore);
  selectedcar!: Car;
  form = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    image: new FormControl('', { nonNullable: true }),
    make: new FormControl('', { nonNullable: true }),
    model: new FormControl('', { nonNullable: true }),
    year: new FormControl(0, { nonNullable: true }),
    color: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    equipments: new FormArray([]),
  });
  length$ = this.desplayCarStore.length$.pipe(
    tap((length) => this.form.controls['id'].setValue((length + 1).toString()))
  );
  loading$ = this.informationCarStore.loading$;
  selectedCar$ = this.informationCarStore.selectedCar$.pipe(
    tap((car) => (this.selectedcar = car))
  );

  img$ = this.form.controls['image'].valueChanges.pipe(tap(console.log));

  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.desplayCarStore.fetchCars();
      this.informationCarStore.selectCar(params['id']);
      console.log('params: ', params['id']);
    });
  }

  onCreate() {
    console.log('Creating');
    this.informationCarStore.createCar(this.form.value);
  }
  onAddEquipment() {
    const equipment = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      equPrice: new FormControl(0),
    });

    this.getEquipmentControls().push(equipment);
  }

  getEquipmentControls() {
    return <FormArray>this.form.get('equipments');
  }
}
