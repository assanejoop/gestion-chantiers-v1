import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOviewComponent } from './project-oview.component';

describe('ProjectOviewComponent', () => {
  let component: ProjectOviewComponent;
  let fixture: ComponentFixture<ProjectOviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
