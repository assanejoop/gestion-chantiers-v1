import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorComponent } from './subcontractor.component';

describe('SubcontractorComponent', () => {
  let component: SubcontractorComponent;
  let fixture: ComponentFixture<SubcontractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcontractorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
