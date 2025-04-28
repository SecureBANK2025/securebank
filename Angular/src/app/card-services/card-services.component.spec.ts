import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServicesComponent } from './card-services.component';

describe('CardServicesComponent', () => {
  let component: CardServicesComponent;
  let fixture: ComponentFixture<CardServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
