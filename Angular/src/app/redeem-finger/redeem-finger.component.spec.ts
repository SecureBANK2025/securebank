import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemFingerComponent } from './redeem-finger.component';

describe('RedeemFingerComponent', () => {
  let component: RedeemFingerComponent;
  let fixture: ComponentFixture<RedeemFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemFingerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
