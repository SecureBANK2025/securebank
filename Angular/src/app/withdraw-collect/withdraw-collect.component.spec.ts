import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCollectComponent } from './withdraw-collect.component';

describe('WithdrawCollectComponent', () => {
  let component: WithdrawCollectComponent;
  let fixture: ComponentFixture<WithdrawCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawCollectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
