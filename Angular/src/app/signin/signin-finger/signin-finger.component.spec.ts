import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninFingerComponent } from './signin-finger.component';

describe('SigninFingerComponent', () => {
  let component: SigninFingerComponent;
  let fixture: ComponentFixture<SigninFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninFingerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
