import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {

  @Input() protected dayLabel: String;

  // todo remplacer avec un service et un nom de variable plus approprié
  protected slot1Date: Date;

  constructor() {
    this.slot1Date = new Date();
  }

  ngOnInit() {
  }

}
