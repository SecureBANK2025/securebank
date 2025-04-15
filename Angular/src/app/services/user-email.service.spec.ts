import { TestBed } from '@angular/core/testing';

import { UserEmailService } from './user-email.service';

describe('UserEmailService', () => {
  let service: UserEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
