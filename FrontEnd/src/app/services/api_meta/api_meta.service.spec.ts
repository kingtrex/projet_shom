import { TestBed } from '@angular/core/testing';

import { ApiMeta } from './api_meta.service';

describe('ApiMetaService', () => {
  let service: ApiMeta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMeta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
