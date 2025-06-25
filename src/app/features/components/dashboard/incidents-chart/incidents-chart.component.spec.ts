import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsChartComponent } from './incidents-chart.component';

describe('IncidentsChartComponent', () => {
  let component: IncidentsChartComponent;
  let fixture: ComponentFixture<IncidentsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
