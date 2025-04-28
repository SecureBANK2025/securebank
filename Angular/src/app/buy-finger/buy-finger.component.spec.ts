import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFingerComponent } from './buy-finger.component';

describe('BuyFingerComponent', () => {
  let component: BuyFingerComponent;
  let fixture: ComponentFixture<BuyFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyFingerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
