import { TestBed } from '@angular/core/testing';

import { StatusDataClientService } from './status-data-client.service';

describe('StatusDataClientService', () => {
  let service: StatusDataClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusDataClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
