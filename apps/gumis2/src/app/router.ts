import { Route } from '@angular/router';
import { DisplayCarComponent } from './display-car/display-car.component';
import { InformationCarComponent } from './information-car/information-car.component';

export const routes: Route[] = [
  {
    path: 'cars',
    component: DisplayCarComponent,
  },
  {
    path: 'cars/:id/detail',
    component: InformationCarComponent,
  },
  { path: '**', redirectTo: 'cars' },
];
