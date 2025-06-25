import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgessReportComponent } from './progess-report.component';

describe('ProgessReportComponent', () => {
  let component: ProgessReportComponent;
  let fixture: ComponentFixture<ProgessReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgessReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
