import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAccountComponent } from './choose-account.component';

describe('ChooseAccountComponent', () => {
  let component: ChooseAccountComponent;
  let fixture: ComponentFixture<ChooseAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
