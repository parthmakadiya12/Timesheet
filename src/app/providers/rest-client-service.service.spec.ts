import { TestBed, inject } from '@angular/core/testing';

import { RestClientServiceService } from './rest-client-service.service';

describe('RestClientServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestClientServiceService]
    });
  });

  it('should be created', inject([RestClientServiceService], (service: RestClientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
