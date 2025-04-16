import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransfer1Component } from './money-transfer1.component';

describe('MoneyTransfer1Component', () => {
  let component: MoneyTransfer1Component;
  let fixture: ComponentFixture<MoneyTransfer1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyTransfer1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTransfer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
