import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeDoneComponent } from './freeze-done.component';

describe('FreezeDoneComponent', () => {
  let component: FreezeDoneComponent;
  let fixture: ComponentFixture<FreezeDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreezeDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreezeDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
