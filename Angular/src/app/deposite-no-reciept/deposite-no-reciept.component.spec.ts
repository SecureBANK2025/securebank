import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeNoRecieptComponent } from './deposite-no-reciept.component';

describe('DepositeNoRecieptComponent', () => {
  let component: DepositeNoRecieptComponent;
  let fixture: ComponentFixture<DepositeNoRecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositeNoRecieptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeNoRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
