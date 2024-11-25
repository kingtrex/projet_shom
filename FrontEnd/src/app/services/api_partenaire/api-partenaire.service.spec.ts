import { TestBed } from '@angular/core/testing';

import { ApiPartenaireService } from './api-partenaire.service';

describe('ApiPartenaireService', () => {
  let service: ApiPartenaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPartenaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
