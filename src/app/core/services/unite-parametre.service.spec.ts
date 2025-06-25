import { TestBed } from '@angular/core/testing';

import { UniteParametreService } from './unite-parametre.service';

describe('UniteParametreService', () => {
  let service: UniteParametreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniteParametreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
