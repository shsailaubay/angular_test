import { TestBed } from '@angular/core/testing';

import { GamingAccountsService } from './gaming-accounts.service';

describe('GamingAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamingAccountsService = TestBed.get(GamingAccountsService);
    expect(service).toBeTruthy();
  });
});
