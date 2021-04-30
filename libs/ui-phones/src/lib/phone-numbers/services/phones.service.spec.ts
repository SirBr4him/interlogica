import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PhonesStore } from '../../phones-store';

import { PhonesService } from './phones.service';

describe('PhonesService', () => {
  let service: PhonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PhonesStore, PhonesService],
    });
    service = TestBed.inject(PhonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
