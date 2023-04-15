import { Component } from '@angular/core';
import { DisplayCarComponent } from './display-car/display-car.component';
import { InformationCarComponent } from './information-car/information-car.component';
@Component({
  standalone: true,
  imports: [DisplayCarComponent, InformationCarComponent],
  selector: 'gumis2-root',
  template: `
    <gumis2-display-car></gumis2-display-car>
    <gumis2-information-car></gumis2-information-car>
  `,
  styles: [],
})
export class AppComponent {
  title = 'gumis2';
}
