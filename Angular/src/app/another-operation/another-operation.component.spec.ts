import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherOperationComponent } from './another-operation.component';

describe('AnotherOperationComponent', () => {
  let component: AnotherOperationComponent;
  let fixture: ComponentFixture<AnotherOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotherOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
