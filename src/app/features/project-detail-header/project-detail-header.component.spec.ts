import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailHeaderComponent } from './project-detail-header.component';

describe('ProjectDetailHeaderComponent', () => {
  let component: ProjectDetailHeaderComponent;
  let fixture: ComponentFixture<ProjectDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
