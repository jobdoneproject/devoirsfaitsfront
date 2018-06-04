import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { WeekUtils } from '../../utils/WeekUtils';
import * as moment from "moment";

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

  constructor(public authService: AuthService, public router: Router) {
  
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    /////////////////////////////////////////
    this.year = 2018;
    this.weekNumber = 23;
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
}
