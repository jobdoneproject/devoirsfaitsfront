import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {

  @Input() private dayLabel: String;
  private slot1Date: Date;

  constructor() {
    this.slot1Date = new Date();
  }

  ngOnInit() {
  }

}
