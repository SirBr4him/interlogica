import { TestBed } from '@angular/core/testing';

import { PhonesTableService } from './phones-table.service';

describe('PhonesTableService', () => {
  let service: PhonesTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhonesTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
