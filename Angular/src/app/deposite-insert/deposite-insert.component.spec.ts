import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeInsertComponent } from './deposite-insert.component';

describe('DepositeInsertComponent', () => {
  let component: DepositeInsertComponent;
  let fixture: ComponentFixture<DepositeInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositeInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
