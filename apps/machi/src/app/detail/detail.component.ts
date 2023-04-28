import { Component, OnInit, inject } from '@angular/core';
import { DetailStore } from '../services/detail.store';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'machi-detail-car',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [provideComponentStore(DetailStore)],
  template: `
    <ng-container
      *ngIf="{
        selectedCar: selectedCar$ | async,
        preview: preview$ | async
      } as vm"
    >
      <h1 *ngIf="!vm.selectedCar" class="text-3xl px-8 py-4">Create car</h1>
      <h1 *ngIf="vm.selectedCar" class="text-3xl px-8 py-4">Edit car</h1>

      <img
        *ngIf="vm.selectedCar || (!vm.selectedCar && vm.preview)"
        class="w-80 aspect-video object-cover"
        [src]="vm.preview"
        alt=""
      />

      <form [formGroup]="form" class="px-8" (submit)="onSave()">
        <div class="grid-cols-2">
          <h2 class="text-3xl my-2">圖片連結</h2>
          <input
            class="outline py-4 px-2"
            type="text"
            formControlName="image"
          />
          <h2 class="text-3xl my-2">售價</h2>
          <input
            class="outline py-4 px-2"
            type="text"
            formControlName="price"
          />
          <h2 class="text-3xl my-2">品牌</h2>
          <input class="outline py-4 px-2" type="text" formControlName="make" />
          <h2 class="text-3xl my-2">車款</h2>
          <input
            class="outline py-4 px-2"
            type="text"
            formControlName="model"
          />
          <h2 class="text-3xl my-2">出廠年份</h2>
          <input class="outline py-4 px-2" type="text" formControlName="year" />
          <h2 class="text-3xl my-2">顏色</h2>
          <input
            class="outline py-4 px-2"
            type="text"
            formControlName="color"
          />
        </div>
        <h2 class="text-3xl my-2">選配</h2>
        <!-- <ng-container *ngIf=""> -->
        <div class="my-4" formArrayName="equipments">
          <ng-container
            *ngFor="let control of equipments.controls; let i = index"
          >
            <div [formGroupName]="i">
              <input placeholder="ID" type="text" formControlName="id" />
              <input
                placeholder="Equipment name"
                type="text"
                formControlName="name"
              />
              <input
                placeholder="equipment price"
                type="text"
                formControlName="equPrice"
              />
              <button
                (click)="onRemoveEquipment(i)"
                type="button"
                class="  bg-green-300 "
              >
                刪除
              </button>
            </div>
          </ng-container>
          <button
            type="button"
            (click)="onAddEquipment()"
            class="bg-yellow-100"
          >
            新增選配件
          </button>
        </div>
        <!-- </ng-container> -->

        <button
          [routerLink]="['/cars']"
          type="button"
          class="bg-red-300 p-2 rounded-full mx-2"
        >
          Discard Changes
        </button>
        <button type="submit" class="bg-blue-300 p-2 rounded-full">
          Save Changes
        </button>
      </form>
    </ng-container>
  `,
  standalone: true,
  styles: [],
})
export class DetailComponent implements OnInit {
  private DetailStore = inject(DetailStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  selectedCar$ = this.DetailStore.loadedCar$.pipe(
    tap((car) => {
      if (car) {
        this.form.patchValue({
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          color: car.color,
          price: car.price,
          image: car.image,
        });

        // eslint-disable-next-line prefer-const
        for (let equipment of car.equipments) {
          this.equipments.push(
            this.newEquipmentFormGroup(
              equipment.id,
              equipment.name,
              equipment.equPrice
            )
          );
        }
      }
    })
  );

  form = new FormGroup({
    id: new FormControl(),
    make: new FormControl('', { nonNullable: true }),
    model: new FormControl('asd', { nonNullable: true }),
    year: new FormControl(0, { nonNullable: true }),
    color: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    image: new FormControl('', { nonNullable: true }),
    equipments: new FormArray([]),
  });

  laoding$ = this.DetailStore.loading$;
  preview$ = this.form.controls['image'].valueChanges;
  vm$ = this.DetailStore.vm$;

  ngOnInit() {
    return;
  }

  get equipments() {
    return <FormArray>this.form.get('equipments');
  }

  onSave() {
    if (!this.equipments.valid) {
      alert('請填寫完整配件資訊');
      console.log(!this.equipments.valid);
      return;
    }
    this.DetailStore.updateCar(this.form.value);
    console.log('you try to save');
    this.router.navigate(['/cars']);
  }

  onRemoveEquipment(index: number) {
    this.equipments.removeAt(index);
  }

  onAddEquipment() {
    this.equipments.push(
      this.newEquipmentFormGroup((this.equipments.length + 1).toString(), '', 0)
    );
  }

  newEquipmentFormGroup(id: string, name: string, price: number) {
    return new FormGroup({
      id: new FormControl(id, Validators.required),
      name: new FormControl(name, Validators.required),
      equPrice: new FormControl(price, Validators.required),
    });
  }
}
