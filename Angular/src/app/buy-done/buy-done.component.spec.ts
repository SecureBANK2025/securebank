import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDoneComponent } from './buy-done.component';

describe('BuyDoneComponent', () => {
  let component: BuyDoneComponent;
  let fixture: ComponentFixture<BuyDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
