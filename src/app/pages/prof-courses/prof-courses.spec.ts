import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCourses } from './prof-courses';

describe('ProfCourses', () => {
  let component: ProfCourses;
  let fixture: ComponentFixture<ProfCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfCourses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
