import { TestBed } from '@angular/core/testing';

import { ApiMaregraphemeta } from './api_maregraphemeta.service';

describe('ApiService', () => {
  let service: ApiMaregraphemeta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMaregraphemeta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
