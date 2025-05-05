import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeRecieptComponent } from './deposite-reciept.component';

describe('DepositeRecieptComponent', () => {
  let component: DepositeRecieptComponent;
  let fixture: ComponentFixture<DepositeRecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositeRecieptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
