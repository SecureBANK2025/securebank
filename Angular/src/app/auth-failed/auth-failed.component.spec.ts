import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFailedComponent } from './auth-failed.component';

describe('AuthFailedComponent', () => {
  let component: AuthFailedComponent;
  let fixture: ComponentFixture<AuthFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
