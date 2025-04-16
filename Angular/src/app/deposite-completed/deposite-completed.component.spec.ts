import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeCompletedComponent } from './deposite-completed.component';

describe('DepositeCompletedComponent', () => {
  let component: DepositeCompletedComponent;
  let fixture: ComponentFixture<DepositeCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositeCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
