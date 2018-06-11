import { Component, OnInit, Input } from '@angular/core';
import { CourseSlotsService } from '../../services/courses-slots.service';
import { WeekDay } from '../../model/model.week-day';
import { CourseSlot } from '../../model/model.course-slots';
import { WeekUtils } from '../../utils/WeekUtils';
import { forEach } from 'underscore';
import { unix } from 'moment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'week-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  
  @Input() year: number;
  @Input() weekNumber: number;
  ngOnChanges(weekNumber: number) {
    this.updateSlots();
  }

  courseSlotsObservable: Observable<CourseSlot[]>;
  days = {
    Lundi: WeekDay.Lundi,
    Mardi: WeekDay.Mardi,
    Mercredi: WeekDay.Mercredi,
    Jeudi: WeekDay.Jeudi,
    Vendredi: WeekDay.Vendredi,
    Samedi: WeekDay.Samedi,
    Dimanche: WeekDay.Dimanche
  };

  constructor(private coursesSlotService: CourseSlotsService) {
    this.courseSlotsObservable = coursesSlotService.fetchSlots(1, this.year, this.weekNumber);
  }

  updateSlots() {
    console.log("year : " + this.year + " & week : " + this.weekNumber);
    this.courseSlotsObservable = this.coursesSlotService.fetchSlots(1, this.year, this.weekNumber);
    console.log(this.courseSlotsObservable);
  }

  ngOnInit() {

  }

}
