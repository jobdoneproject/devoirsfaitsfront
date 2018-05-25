import { Component, OnInit } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

@Component({
  selector: 'week-calendar-weekend-day',
  templateUrl: '../calendar-day/calendar-day.component.html',
  styleUrls: ['./calendar-weekend-day.component.scss']
})
export class CalendarWeekendDayComponent extends CalendarDayComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
