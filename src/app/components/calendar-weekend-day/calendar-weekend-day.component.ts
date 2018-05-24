import { Component, OnInit } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

@Component({
  selector: 'calendar-weekend-day',
  templateUrl: './calendar-weekend-day.component.html',
  styleUrls: ['./calendar-weekend-day.component.scss']
})
export class CalendarWeekendDayComponent extends CalendarDayComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
