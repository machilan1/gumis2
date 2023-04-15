import { Component, inject } from '@angular/core';
import { DisplayCarComponent } from './display-car/display-car.component';
import { InformationCarComponent } from './information-car/information-car.component';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
@Component({
  standalone: true,
  imports: [DisplayCarComponent, InformationCarComponent, RouterOutlet],
  selector: 'gumis2-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  route = inject(ActivatedRoute);
  title = 'gumis2';
}
