import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoProjectComponent } from './photo-project.component';

describe('PhotoProjectComponent', () => {
  let component: PhotoProjectComponent;
  let fixture: ComponentFixture<PhotoProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
