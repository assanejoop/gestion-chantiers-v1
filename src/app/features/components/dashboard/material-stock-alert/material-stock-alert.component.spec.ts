import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialStockAlertComponent } from './material-stock-alert.component';

describe('MaterialStockAlertComponent', () => {
  let component: MaterialStockAlertComponent;
  let fixture: ComponentFixture<MaterialStockAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialStockAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialStockAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
