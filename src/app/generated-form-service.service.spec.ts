import { TestBed } from '@angular/core/testing';

import { GeneratedFormServiceService } from './generated-form-service.service';

describe('GeneratedFormServiceService', () => {
  let service: GeneratedFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratedFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
