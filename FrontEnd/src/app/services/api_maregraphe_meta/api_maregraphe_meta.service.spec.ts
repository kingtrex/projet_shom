import { TestBed } from '@angular/core/testing';

import { ApiMaregraphemeta } from './api_maregraphe_meta.service';

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
