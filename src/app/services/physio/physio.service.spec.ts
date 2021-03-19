import { TestBed } from '@angular/core/testing';

import { PhysioService } from './physio.service';

describe('PhysioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhysioService = TestBed.get(PhysioService);
    expect(service).toBeTruthy();
  });
});
