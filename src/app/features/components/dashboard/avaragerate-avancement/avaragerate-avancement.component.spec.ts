import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaragerateAvancementComponent } from './avaragerate-avancement.component';

describe('AvaragerateAvancementComponent', () => {
  let component: AvaragerateAvancementComponent;
  let fixture: ComponentFixture<AvaragerateAvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaragerateAvancementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaragerateAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
