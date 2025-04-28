import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCompletedComponent } from './withdraw-completed.component';

describe('WithdrawCompletedComponent', () => {
  let component: WithdrawCompletedComponent;
  let fixture: ComponentFixture<WithdrawCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
