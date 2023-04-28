import { Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { DetailComponent } from './detail/detail.component';

export const appRoutes: Routes = [
  { path: 'cars', component: DisplayComponent },
  { path: 'cars/:id/detail', component: DetailComponent },
  { path: '**', redirectTo: 'cars' },
];
