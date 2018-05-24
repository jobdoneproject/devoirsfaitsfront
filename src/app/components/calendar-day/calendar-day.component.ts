import { Component, OnInit, Input } from '@angular/core';
import {CourseSlot} from '../../model/model.course-slots';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {

  @Input() protected dayLabel: String;
  @Input() protected courseSlots: CourseSlot[];

  constructor() {
  }

  ngOnInit() {
  }

}
