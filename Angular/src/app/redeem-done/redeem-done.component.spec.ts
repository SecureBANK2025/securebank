import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemDoneComponent } from './redeem-done.component';

describe('RedeemDoneComponent', () => {
  let component: RedeemDoneComponent;
  let fixture: ComponentFixture<RedeemDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
