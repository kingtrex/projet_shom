import { TestBed } from '@angular/core/testing';

import { APIChoixMaregrapheService } from './api_choix_maregraphe.service';

describe('APIChoixMaregrapheService', () => {
  let service: APIChoixMaregrapheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIChoixMaregrapheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
