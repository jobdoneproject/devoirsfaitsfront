import { Component, OnInit, Input } from '@angular/core';
import { CourseSlot } from '../../model/model.course-slots';
import { WeekDay } from '../../model/model.week-day';
import { WeekUtils } from '../../utils/WeekUtils';

@Component({
  selector: 'week-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {

  @Input() protected dayLabel: String;
  @Input() protected courseSlots: CourseSlot[];
  @Input() protected day: WeekDay;
  @Input() protected weekNumber: number;
  @Input() protected year: number;

  constructor() {
  }

  ngOnInit() {
  }

  get dayDate() : Date {
    const mondayForCurrentWeek = WeekUtils.mondayForWeekNumber(this.weekNumber, this.year);
    const matchingDate = WeekUtils.getDateWithDaysOffset(mondayForCurrentWeek, WeekUtils.dayOfWeekDay(this.day));

    return matchingDate;
  }

}
