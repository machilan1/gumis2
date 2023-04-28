import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayStore } from '../services/display.store';
import { RouterLink } from '@angular/router';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'machi-display-car',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [DisplayStore],
  template: `
    <div class="" *ngIf="vm$ | async as vm">
      <h1 class="text-3xl px-8 py-4">Machi's Garage</h1>
      <div class="flex gap-4 ">
        <ng-container *ngFor="let car of vm.cars">
          <div class="w-40 ">
            <div
              *ngIf="car.image.length < 1"
              class="w-full flex flex-col justify-center items-center aspect-video bg-gray-100"
            >
              <span> NO IMAGE </span>
            </div>
            <img
              *ngIf="car.image"
              class="w-full aspect-video object-cover"
              [src]="car.image"
              alt=""
            />
            <div class="min-h-[14rem] flex flex-col ">
              <h2 class="text-xl">{{ car.make }}</h2>
              <h2 class="text-xl block">{{ car.model }}</h2>
              <h2 class="text-xl block">{{ car.year }}</h2>
              <div>
                <ng-container *ngFor="let equipment of car.equipments">
                  <p class="block">{{ equipment.name }}</p>
                </ng-container>
              </div>
              <button
                class="outline px-4 "
                type="button"
                [routerLink]="['/cars', car.id, 'detail']"
              >
                Edit Car
              </button>
              <button
                type="button"
                (click)="onDelete(car.id!)"
                class="text-red-800 my-2"
              >
                Delete
              </button>
            </div>
          </div>
        </ng-container>
        <div
          [routerLink]="['/cars/create/detail']"
          class="w-40 min-h-[10rem] bg-gray-100 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200"
        >
          <span class="text-3xl block">+</span>
        </div>
      </div>
    </div>
  `,
  styles: [''],
})
export class DisplayComponent implements OnInit {
  private DisplayStore = inject(DisplayStore);

  vm$ = this.DisplayStore.vm$;

  ngOnInit() {
    this.DisplayStore.fetchCars();
  }

  onDelete(carId: string) {
    this.DisplayStore.deleteCar(carId);
    setTimeout(() => {
      this.DisplayStore.fetchCars();
    }, 100);
  }
}
