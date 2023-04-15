import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCarComponent } from './information-car.component';

describe('InformationCarComponent', () => {
  let component: InformationCarComponent;
  let fixture: ComponentFixture<InformationCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationCarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
