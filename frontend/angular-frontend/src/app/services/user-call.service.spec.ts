import { TestBed } from '@angular/core/testing';

import { UserCallService } from './user-call.service';

describe('UserCallService', () => {
  let service: UserCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
