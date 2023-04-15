import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisplayCarsStore } from '../services/display-cars.store';
import { take } from 'rxjs/operators';
import { Car } from '@gumis2/data-access';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'gumis2-information-car',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.selectedCar">
        <h1 class="text-4xl text-center py-6">Edit Car Informations</h1>
        <div class="w-full flex flex-col items-center">
          <img class="w-2/5" [src]="vm.selectedCar!.image" alt="Car photo" />
          <form formGroup="form" class="flex flex-col">
            <p>Maker</p>
            <input
              type="text"
              formControlName="make"
              [value]="vm.selectedCar.make"
              placeholder="12222"
            />
            <p>Model</p>
            <input
              type="text"
              formControlName="model"
              [value]="vm.selectedCar.model"
            />
            <p>Year</p>
            <input
              type="text"
              formControlName="year"
              [value]="vm.selectedCar.year"
            />
            <p>Color</p>
            <input
              type="text"
              formControlName="color"
              [value]="vm.selectedCar.color"
            />
            <p>Price</p>
            <input
              type="text"
              formControlName="price"
              [value]="vm.selectedCar.price"
            />
            <p>Equipments</p>
            <input
              type="text"
              formControlName="equipments"
              [value]="vm.selectedCar.equipments"
            />
            <div class="flex justify-between py-4">
              <button
                [routerLink]="['/cars']"
                type="button"
                class="bg-red-400 h-8 w-fit px-4 my-4 self-end text-gray-800 rounded-full cursor-pointer hover:bg-red-200 "
              >
                Discard Changes
              </button>
              <button
                (click)="onSubmit()"
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
})
export class InformationCarComponent implements OnInit {
  displayCarsStore = inject(DisplayCarsStore);
  route = inject(ActivatedRoute);
  vm$ = this.displayCarsStore.vm$;

  id!: string;
  form = new FormGroup({
    photo: new FormControl(null, Validators.required),
    make: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    equipments: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    console.log('d');
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.displayCarsStore.fetchCar(this.id);
  }

  onSubmit() {
    this.displayCarsStore.updateCarData(this.id, this.form.value);
  }
}
