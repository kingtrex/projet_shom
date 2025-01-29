import { TestBed } from '@angular/core/testing';

import { SMLExportService } from './sml-export.service';

describe('SMLExportService', () => {
  let service: SMLExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMLExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
