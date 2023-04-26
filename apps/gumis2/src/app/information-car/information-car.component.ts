import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';

import { tap } from 'rxjs/operators';
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
      .equip input {
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
    equipments: new FormArray([]),
  });

  loading$ = this.informationCarStore.loading$;
  selectedCar$ = this.informationCarStore.selectedCar$.pipe(
    tap((car) => {
      this.selectedcar = car;
      this.form.patchValue({
        make: this.selectedcar.make,
        model: this.selectedcar.model,
        year: this.selectedcar.year,
        color: this.selectedcar.color,
        price: this.selectedcar.price,
      });
    }),
    tap(() => {
      // eslint-disable-next-line prefer-const
      for (let equipment of this.selectedcar.equipments) {
        console.log('aaaaaa');
        console.log(this.selectedcar);
        this.getEquipmentControls().push(
          new FormGroup({
            id: new FormControl(equipment.id),
            name: new FormControl(equipment.name),
            equPrice: new FormControl(equipment.equPrice),
          })
        );
      }
    })
  );

  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      this.informationCarStore.selectCar(params['id']);
      console.log('params: ', params['id']);
    });
  }

  onSave() {
    console.log('Saving');
    const data = this.form.value;
    console.log(data);
    this.informationCarStore.updateCar(data);
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
