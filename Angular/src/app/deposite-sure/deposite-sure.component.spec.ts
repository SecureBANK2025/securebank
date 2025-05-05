import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeSureComponent } from './deposite-sure.component';

describe('DepositeSureComponent', () => {
  let component: DepositeSureComponent;
  let fixture: ComponentFixture<DepositeSureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositeSureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
