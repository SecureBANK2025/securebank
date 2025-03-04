import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumPadComponent } from './num-pad.component';

describe('NumPadComponent', () => {
  let component: NumPadComponent;
  let fixture: ComponentFixture<NumPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumPadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
