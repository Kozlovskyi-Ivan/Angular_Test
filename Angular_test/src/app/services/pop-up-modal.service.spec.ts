import { TestBed } from '@angular/core/testing';

import { PopUpModalService } from './pop-up-modal.service';

describe('PopUpModalService', () => {
  let service: PopUpModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
