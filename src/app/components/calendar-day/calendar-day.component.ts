import { Component, OnInit, Input } from '@angular/core';
import { CourseSlot } from '../../model/model.course-slots';
import { WeekDay } from '../../model/model.week-day';
import { WeekUtils } from '../../utils/WeekUtils';

@Component({
  selector: 'calendar-day',
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
    let dayOffset;
    switch(this.day){
      case WeekDay.Lundi : dayOffset = 0; break;
      case WeekDay.Mardi : dayOffset = 1; break;
      case WeekDay.Mercredi : dayOffset = 2; break;
      case WeekDay.Jeudi : dayOffset = 3; break;
      case WeekDay.Vendredi : dayOffset = 4; break;
      case WeekDay.Samedi : dayOffset = 5; break;
      case WeekDay.Dimanche : dayOffset = 6; break;
    }
    const mondayForCurrentWeek = WeekUtils.mondayForWeekNumber(this.weekNumber, this.year);
    const matchingDate = WeekUtils.getDateWithDaysOffset(mondayForCurrentWeek, dayOffset);

    return matchingDate;
  }

}
