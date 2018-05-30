import { TestBed, inject } from '@angular/core/testing';

import { CourseSlotsService } from './courses-slots.service';

describe('CourseSlotsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseSlotsService]
    });
  });

  it('should be created', inject([CourseSlotsService], (service: CourseSlotsService) => {
    expect(service).toBeTruthy();
  }));
});
