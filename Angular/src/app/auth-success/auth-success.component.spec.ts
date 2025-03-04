import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessComponent } from './auth-success.component';

describe('AuthSuccessComponent', () => {
  let component: AuthSuccessComponent;
  let fixture: ComponentFixture<AuthSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
