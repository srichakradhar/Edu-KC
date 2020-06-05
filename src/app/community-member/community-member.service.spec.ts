import { TestBed } from '@angular/core/testing';

import { CommunityMemberService } from './community-member.service';

describe('CommunityMemberService', () => {
  let service: CommunityMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
