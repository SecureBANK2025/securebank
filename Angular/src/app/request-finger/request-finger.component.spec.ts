import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFingerComponent } from './request-finger.component';

describe('RequestFingerComponent', () => {
  let component: RequestFingerComponent;
  let fixture: ComponentFixture<RequestFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFingerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
