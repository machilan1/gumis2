import { Injectable, inject } from '@angular/core';
import { Car } from '@gumis2/data-access';
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from '@ngrx/component-store';
import { CarsService2 } from './car2-service';
import { Observable, switchMap, tap, map, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface DetailState {
  loadedCar: Car | null;
  loading: boolean;
}
const initialState: DetailState = {
  loadedCar: null,
  loading: false,
};

@Injectable()
export class DetailStore
  extends ComponentStore<DetailState>
  implements OnStateInit
{
  private carService = inject(CarsService2);
  private route = inject(ActivatedRoute);

  constructor() {
    super(initialState);
  }

  //   define interested objs.

  readonly loadedCar$ = this.select((state) => state.loadedCar);
  readonly loading$ = this.select((state) => state.loading);
  readonly vm$ = this.select({
    loadedCar: this.loadedCar$,
    loading: this.loading$,
  });

  //

  readonly fetchCar = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState({ loading: true });
      }),
      switchMap((id) =>
        this.carService.fetchCar(id).pipe(
          tapResponse(
            (car) => this.patchState({ loadedCar: car, loading: false }),
            () => {
              this.patchState({ loading: false });
              alert('No car was fetched');
            }
          )
        )
      )
    );
  });

  readonly updateCar = this.effect((body$: Observable<Partial<Car>>) => {
    return body$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((body) => {
        return this.getCarIdFromUrl().pipe(
          switchMap((id) => {
            if (!body.id) {
              body.id = Math.floor(10 + 100 * Math.random()).toString();
              return this.carService.createCar(body).pipe(
                tapResponse(
                  () => this.patchState({ loading: false }),
                  () => {
                    this.patchState({ loading: false });
                    alert('Failed to create');
                  }
                )
              );
            } else {
              return this.carService.updateCar(id, body).pipe(
                tapResponse(
                  () => this.patchState({ loading: false }),
                  () => {
                    this.patchState({ loading: false });
                    alert('Failed to update');
                  }
                )
              );
            }
          })
        );
      })
    );
  });

  ngrxOnStateInit() {
    this.getCarIdFromUrl().subscribe((id) => this.fetchCar(id));
    //
  }

  getCarIdFromUrl() {
    return this.route.params.pipe(
      takeUntil(this.destroy$),
      map((params) => params['id'])
    );
  }
}
