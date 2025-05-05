import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCertificatesComponent } from './my-certificates.component';

describe('MyCertificatesComponent', () => {
  let component: MyCertificatesComponent;
  let fixture: ComponentFixture<MyCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
