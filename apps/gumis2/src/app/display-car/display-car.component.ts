import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gumis2-display-car',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>display-car works!</p>
    <div>
      <img src="" />
      <p>car make</p>
      <p>car model</p>
      <p>car color</p>
      <p>car price</p>
    </div>
  `,
  styles: [],
})
export class DisplayCarComponent {}
