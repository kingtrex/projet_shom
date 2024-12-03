import { TestBed } from '@angular/core/testing';

import { ApiPartenaireMaregrapheService } from './api_partenaire_maregraphe.service';

describe('ApiPartenaireMaregrapheService', () => {
  let service: ApiPartenaireMaregrapheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPartenaireMaregrapheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
