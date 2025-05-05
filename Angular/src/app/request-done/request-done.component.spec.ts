import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDoneComponent } from './request-done.component';

describe('RequestDoneComponent', () => {
  let component: RequestDoneComponent;
  let fixture: ComponentFixture<RequestDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
