import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfreezeComponent } from './unfreeze.component';

describe('UnfreezeComponent', () => {
  let component: UnfreezeComponent;
  let fixture: ComponentFixture<UnfreezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnfreezeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfreezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
