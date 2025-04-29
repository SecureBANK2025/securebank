import { TestBed } from '@angular/core/testing';

import { DepositeService } from './deposite.service';

describe('DepositeService', () => {
  let service: DepositeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
