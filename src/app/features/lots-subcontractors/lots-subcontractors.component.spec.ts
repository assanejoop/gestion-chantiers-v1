import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsSubcontractorsComponent } from './lots-subcontractors.component';

describe('LotsSubcontractorsComponent', () => {
  let component: LotsSubcontractorsComponent;
  let fixture: ComponentFixture<LotsSubcontractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotsSubcontractorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotsSubcontractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
