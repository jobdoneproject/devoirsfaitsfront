import { Component, OnInit, Input } from '@angular/core';
import { CourseSlotsService } from '../../services/courses-slots.service';
import { WeekDay } from '../../model/model.week-day';
import { CourseSlot } from '../../model/model.course-slots';
import { WeekUtils } from '../../utils/WeekUtils';

@Component({
  selector: 'week-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() private _weekNumber: number;
  @Input() private _year: number;
  private _courseSlots: CourseSlot [];
  private _days = {
    Lundi : WeekDay.Lundi,
    Mardi : WeekDay.Mardi,
    Mercredi: WeekDay.Mercredi,
    Jeudi: WeekDay.Jeudi,
    Vendredi: WeekDay.Vendredi,
    Samedi: WeekDay.Samedi,
    Dimanche: WeekDay.Dimanche
  };

  constructor( private coursesSlotService : CourseSlotsService ) {
    // Using current date for initialisation 
    this._courseSlots = this.coursesSlotService.getSlotsForWeekIncludingDate(new Date());
  }

  ngOnInit() {
    const now = new Date();
    this._weekNumber = WeekUtils.getWeekNumberForDate(now);
    this._year = now.getFullYear();
  }

  public get courseSlots(): CourseSlot[] {
    return this._courseSlots;
  }

  public get days() {
    return this._days;
  }

  public get weekNumber() : number {
    return this._weekNumber;
  }

  public get year(): number {
    return this._year;
  }

}
