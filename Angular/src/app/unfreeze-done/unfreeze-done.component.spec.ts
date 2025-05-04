import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfreezeDoneComponent } from './unfreeze-done.component';

describe('UnfreezeDoneComponent', () => {
  let component: UnfreezeDoneComponent;
  let fixture: ComponentFixture<UnfreezeDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnfreezeDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfreezeDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
