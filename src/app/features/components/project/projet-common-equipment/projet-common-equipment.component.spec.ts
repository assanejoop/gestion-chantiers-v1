import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetCommonEquipmentComponent } from './projet-common-equipment.component';

describe('ProjetCommonEquipmentComponent', () => {
  let component: ProjetCommonEquipmentComponent;
  let fixture: ComponentFixture<ProjetCommonEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetCommonEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetCommonEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
