import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calendar-slot',
  templateUrl: './calendar-slot.component.html',
  styleUrls: ['./calendar-slot.component.scss']
})
export class CalendarSlotComponent implements OnInit {

  @Input() private date: Date;

  constructor() { }

  ngOnInit() {
  }

}
