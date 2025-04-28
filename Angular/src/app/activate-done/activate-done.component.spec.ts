import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDoneComponent } from './activate-done.component';

describe('ActivateDoneComponent', () => {
  let component: ActivateDoneComponent;
  let fixture: ComponentFixture<ActivateDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
