import { Component, OnInit, Input } from '@angular/core';
import { CourseSlot } from '../../model/model.course-slots';

@Component({
  selector: 'calendar-slot',
  templateUrl: './calendar-slot.component.html',
  styleUrls: ['./calendar-slot.component.scss']
})
export class CalendarSlotComponent implements OnInit {

  @Input() private slotValue: CourseSlot;

  constructor() { }

  ngOnInit() {
  }

  public get slot(): CourseSlot {
    return this.slotValue;
  }

}
