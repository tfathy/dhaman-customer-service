import { TestBed } from '@angular/core/testing';

import { CreditLimitService } from './credit-limit.service';

describe('CreditLimitService', () => {
  let service: CreditLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
