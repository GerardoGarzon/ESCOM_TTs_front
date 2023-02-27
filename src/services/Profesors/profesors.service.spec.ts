import { TestBed } from '@angular/core/testing';

import { ProfesorsService } from './profesors.service';

describe('ProfesorsService', () => {
  let service: ProfesorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
