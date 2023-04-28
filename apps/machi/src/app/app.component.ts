import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { DisplayComponent } from './display/display.component';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, DisplayComponent],
  selector: 'gumis2-root',
  template: `<router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
