import { TestBed } from '@angular/core/testing';

import { ChoixMaregrapheService } from './api_choix_maregraphe.service';

describe('ChoixMaregrapheService', () => {
  let service: ChoixMaregrapheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoixMaregrapheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
