import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallBudgetComponent } from './overall-budget.component';

describe('OverallBudgetComponent', () => {
  let component: OverallBudgetComponent;
  let fixture: ComponentFixture<OverallBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
