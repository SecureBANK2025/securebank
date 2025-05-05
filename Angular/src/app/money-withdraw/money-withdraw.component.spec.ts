import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyWithdrawComponent } from './money-withdraw.component';

describe('MoneyWithdrawComponent', () => {
  let component: MoneyWithdrawComponent;
  let fixture: ComponentFixture<MoneyWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyWithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
