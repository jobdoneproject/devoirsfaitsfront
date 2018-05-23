import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  inputs: ['dayLabel : day-label']
})
export class CalendarDayComponent implements OnInit {

  private dayLabel: String;

  constructor() { }

  ngOnInit() {
  }

}
