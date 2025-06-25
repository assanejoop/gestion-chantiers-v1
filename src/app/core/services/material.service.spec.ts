import { TestBed } from '@angular/core/testing';

// import { StocksService } from '../../services/stocks.service';
import { MaterialsService } from './materials.service.';


describe('StocksService', () => {
  let service: MaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
