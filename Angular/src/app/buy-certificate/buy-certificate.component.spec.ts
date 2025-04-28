import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCertificateComponent } from './buy-certificate.component';

describe('BuyCertificateComponent', () => {
  let component: BuyCertificateComponent;
  let fixture: ComponentFixture<BuyCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
