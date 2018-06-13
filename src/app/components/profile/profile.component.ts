import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { WeekUtils } from '../../utils/WeekUtils';
import * as moment from "moment";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  title:string = "Vue du calendrier" ;

  currentUser: User;
  referenceDate: Date;
  weekNumber: number;
  year: number;
  weeksToDuplicate: number[] = [];

  constructor(private userService: UserService, public authService: AuthService, public router: Router) {
  
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserLogged();

    /////////////////////////////////////////
    this.year = moment().toDate().getFullYear();
    this.weekNumber = WeekUtils.getWeekNumberForDate(moment().toDate());
    /////////////////////////////////////////
    const attributesAreMissing = this.weekNumber === undefined || this.year === undefined;
    if (attributesAreMissing) {
      this.referenceDate = new Date();
      this.year = this.referenceDate.getFullYear();
      this.weekNumber = WeekUtils.getWeekNumberForDate(this.referenceDate);
    }
    else {
      this.referenceDate = WeekUtils.mondayForWeekNumber(this.weekNumber, this.year);
      this.year = this.referenceDate.getFullYear();
      this.weekNumber = WeekUtils.getWeekNumberForDate(this.referenceDate);
    }  
  }

  get startDate() : Date {
    return WeekUtils.findMondayForWeekContainingDay(this.referenceDate);
  }

  get endDate() : Date {
    return WeekUtils.getDateWithDaysOffset(this.startDate, 6);
  }


// login out from the app
  logOut() {
    console.log('logout profil');

    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }


  semainePrecedente(){
    const referenceDateAsMoment = moment(this.referenceDate);
    const newReferenceDateAsMoment = referenceDateAsMoment.subtract(1, 'weeks').startOf('isoWeek');
    this.referenceDate = newReferenceDateAsMoment.toDate();
    this.year = this.referenceDate.getFullYear();
    this.weekNumber = WeekUtils.getWeekNumberForDate(this.referenceDate);
  }

  semaineSuivante(){
    const referenceDateAsMoment = moment(this.referenceDate);
    const newReferenceDateAsMoment = referenceDateAsMoment.add(1, 'weeks').startOf('isoWeek');
    this.referenceDate = newReferenceDateAsMoment.toDate();
    this.year = this.referenceDate.getFullYear();
    this.weekNumber = WeekUtils.getWeekNumberForDate(this.referenceDate);
  }

  update(weeknum:Date) {
    const referenceDateAsMoment = moment(weeknum);
    this.referenceDate = referenceDateAsMoment.toDate();
    this.year = Number(weeknum.toString().substring(0, 4));
    this.weekNumber = Number(weeknum.toString().substring(6, 9));
  }

  get monthFromDate () {
    return WeekUtils.getMonthFromDate(this.weekNumber).toString();
  }

  addWeekToSelection (){
    this.weeksToDuplicate.push(moment().year(this.year).week(this.weekNumber).unix());
  }
  
  goToDuplicate () {
    const param = JSON.stringify(this.weeksToDuplicate);
    this.router.navigate(['/duplicate', {semaines : param }]);
  }
}
