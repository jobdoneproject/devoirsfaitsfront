import { Injectable } from '@angular/core';
import { CourseSlot } from '../model/model.course-slots';

@Injectable({
  providedIn: 'root'
})
export class CourseSlotsService {

  constructor() { }

  getSlotsForWeekNumber(weekNumber: Number) : CourseSlot [] {
    //TODO fetch and convert the slots from database
    return [
      new CourseSlot(
        new Date(2018, 1, 17, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 12, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 10, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 11, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 13, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 14, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 18, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 14, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 12, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
      new CourseSlot(
        new Date(2018, 1, 12, 17, 23, 0, 0), 
        new Date(0, 0, 0, 1, 15, 0, 0), 
        'Mrs Dupond', 
        123
      ),
    ];
  }

  getSlotsForWeekIncludingDate(date: Date) : CourseSlot [] {
    const matchingWeekNumber: Number = CourseSlotsService.getWeekNumber(date);
    return this.getSlotsForWeekNumber(matchingWeekNumber);
  }

  /*
    Credits to https://weeknumber.net/how-to/javascript
    => [1, 53]
  */
  static getWeekNumber(date: Date): Number {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 0.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
  }
}
