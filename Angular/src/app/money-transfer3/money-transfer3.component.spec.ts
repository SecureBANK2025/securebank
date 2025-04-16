import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransfer3Component } from './money-transfer3.component';

describe('MoneyTransfer3Component', () => {
  let component: MoneyTransfer3Component;
  let fixture: ComponentFixture<MoneyTransfer3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyTransfer3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTransfer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
