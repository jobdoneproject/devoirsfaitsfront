import { Component, OnInit } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { User } from '../../model/model.user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'week-calendar-weekend-day',
  templateUrl: '../calendar-day/calendar-day.component.html',
  styleUrls: ['./calendar-weekend-day.component.scss']
})
export class CalendarWeekendDayComponent extends CalendarDayComponent implements OnInit {

  constructor(userService: UserService) {
    super(userService);
   }

  ngOnInit() {
    this.courseSlotsObservable.subscribe((resp) => {
      this.courseSlots = resp;  
      this.filterSlotsMatchingThisDay();
      this.filterSlotsMatchingCurrentUser();
    });
  }

}
