import { TestBed } from '@angular/core/testing';

import { PreregistrosService } from './preregistros.service';

describe('PreregistrosService', () => {
  let service: PreregistrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreregistrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
