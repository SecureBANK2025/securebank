import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailableComponent } from './view-available.component';

describe('ViewAvailableComponent', () => {
  let component: ViewAvailableComponent;
  let fixture: ComponentFixture<ViewAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
