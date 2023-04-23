import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayCarsStore } from '../services/display-cars.store';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gumis2-display-car',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div>
        <h1 class="text-center px-8 py-4 text-3xl">Gumis' Garage</h1>
        <div>
          <ul class="grid grid-cols-2 ">
            <ng-container *ngFor="let car of vm.cars">
              <li class=" px-4 mx-4 ">
                <a class="flex justify-center">
                  <div class="w-fit h-fit py-8  flex flex-col shadow-lg p-4">
                    <img
                      class="w-full h-64 object-contain my-4"
                      [src]="car.image"
                      alt="image of car"
                    />
                    <div class="px-4">
                      <p class="text-3xl">
                        {{ car.make }} - {{ car.model }} <br />
                        {{ car.year }}
                      </p>
                    </div>
                    <div class="flex justify-between p-4">
                      <div>
                        <p>Color : {{ car.color }}</p>
                        <p>Price : {{ car.price }}</p>
                      </div>
                      <div class="flex flex-col justify-center">
                        <button
                          [routerLink]="['/cars', car.id, 'detail']"
                          class="bg-blue-400 h-8 w-fit px-4 text-gray-800 rounded-full cursor-pointer hover:bg-blue-200 "
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ng-container>
            <li class=" px-4 mx-4 ">
              <a class="flex justify-center">
                <div class="w-full h-fit py-8   shadow-lg p-4">
                  <div
                    class="h-64 w-full flex flex-col justify-center items-center"
                  >
                    <button
                      [routerLink]="['/cars', 'new']"
                      class="border-2 border-slate-800 h-8 w-fit px-4 text-gray-800 rounded-full hover:border-0 cursor-pointer hover:bg-blue-200 "
                    >
                      List a new car
                    </button>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class DisplayCarComponent implements OnInit {
  displayCarsStore = inject(DisplayCarsStore);
  route = inject(ActivatedRoute);
  vm$ = this.displayCarsStore.vm$;

  ngOnInit() {
    this.displayCarsStore.fetchCars();
  }
}
