import { Component, OnInit, Input } from '@angular/core';
import { CourseSlot } from '../../model/model.course-slots';
import { User } from '../../model/model.user';

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

  public get organizerLabel() : String {
    const mainTeacher = this.slotValue.teachers[0];
    return `${mainTeacher.nom} ${mainTeacher.prenom}`;
  }

}
