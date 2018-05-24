import { Component, OnInit, Input } from '@angular/core';
import { CourseSlotsService } from '../../services/courses-slots.service';
import { WeekDay } from '../../model/model.week-day';
import { CourseSlot } from '../../model/model.course-slots';

@Component({
  selector: 'week-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() private weekNumber: Number;
  private _courseSlots: CourseSlot [];

  constructor( private coursesSlotService : CourseSlotsService ) {
    // Using current date for initialisation 
    this._courseSlots = this.coursesSlotService.getSlotsForWeekIncludingDate(new Date());
  }

  ngOnInit() {
  }

  get courseSlots(): CourseSlot[] {
    return this._courseSlots;
  }

}
