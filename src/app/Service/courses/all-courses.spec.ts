import { TestBed } from '@angular/core/testing';

import { AllCourses } from './all-courses';

describe('AllCourses', () => {
  let service: AllCourses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCourses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
