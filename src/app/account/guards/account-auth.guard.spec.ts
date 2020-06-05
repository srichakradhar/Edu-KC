import { TestBed } from '@angular/core/testing';

import { AccountAuthGuard } from './account-auth.guard';

describe('AccountAuthGuard', () => {
  let guard: AccountAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
