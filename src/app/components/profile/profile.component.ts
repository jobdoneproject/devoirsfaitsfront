import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { WeekUtils } from '../../utils/WeekUtils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  protected referenceDate: Date;
  protected weekNumber: number;
  protected year: number;

  constructor(public authService: AuthService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const attributesAreMissing = this.weekNumber === undefined || this.year === undefined;
    if (attributesAreMissing) {
      this.referenceDate = new Date();
      this.year = this.referenceDate.getFullYear();
      this.weekNumber = WeekUtils.getWeekNumberForDate(this.referenceDate);
    }
    else {
      this.referenceDate = WeekUtils.mondayForWeekNumber(this.weekNumber, this.year);
    }
  }

  ngOnInit() {
    
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
}
