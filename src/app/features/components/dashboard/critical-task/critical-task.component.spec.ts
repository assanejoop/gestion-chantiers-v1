import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalTaskComponent } from './critical-task.component';

describe('CriticalTaskComponent', () => {
  let component: CriticalTaskComponent;
  let fixture: ComponentFixture<CriticalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticalTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
