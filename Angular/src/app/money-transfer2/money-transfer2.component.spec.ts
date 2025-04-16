import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransfer2Component } from './money-transfer2.component';

describe('MoneyTransfer2Component', () => {
  let component: MoneyTransfer2Component;
  let fixture: ComponentFixture<MoneyTransfer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyTransfer2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTransfer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
