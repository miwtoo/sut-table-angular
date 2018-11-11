import { TestBed } from '@angular/core/testing';

import { SutRegService } from './sut-reg.service';

describe('SutRegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SutRegService = TestBed.get(SutRegService);
    expect(service).toBeTruthy();
  });
});
