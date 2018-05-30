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

  @Input() protected weekNumber: number;
  @Input() protected year: number;
  protected courseSlotsObservable: Observable<CourseSlot []>;
  protected days = {
    Lundi : WeekDay.Lundi,
    Mardi : WeekDay.Mardi,
    Mercredi: WeekDay.Mercredi,
    Jeudi: WeekDay.Jeudi,
    Vendredi: WeekDay.Vendredi,
    Samedi: WeekDay.Samedi,
    Dimanche: WeekDay.Dimanche
  };

  constructor( private coursesSlotService : CourseSlotsService ) {
    this.courseSlotsObservable = this.coursesSlotService.fetchSlots();
  }

  ngOnInit() {
    
   }

}
