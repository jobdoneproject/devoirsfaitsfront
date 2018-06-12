import { Component, OnInit } from '@angular/core';
import { User } from '../../model/model.user';
import * as moment from 'moment';
import { MatListModule } from '@angular/material/list';
import {Router, Routes, ActivatedRoute} from "@angular/router";
import { CreneauService } from "../../services/creneau.service";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-duplicate-week',
  templateUrl: './duplicate-week.component.html',
  styleUrls: ['./duplicate-week.component.scss']
})
export class DuplicateWeekComponent implements OnInit {
  allweeks: number[] = [];
  selectedWeeks: number[];
  duplicatedWeeks: number[] = [];
  startDate: Date;



  constructor(private userService: UserService, private creneauService: CreneauService, private _Activatedroute:ActivatedRoute, private route: Router) { }

  ngOnInit() {
    const param = this._Activatedroute.snapshot.params['semaines'];
    this.duplicatedWeeks = JSON.parse(param);
  }

  setStartDate(date: Date) {
    this.startDate = date;
  }

  setEndDate(date: Date) {
    this.selectedWeeks = [];  //sinon le pré-cochage n'est pas effectif sans une interraction de notre part
    this.allweeks = []; //clean du tableau pour un refresh
    const startingWeek = moment(this.startDate);
    const numberOfWeekToDisplay = moment(date).diff(startingWeek, 'weeks');
    for (var i = 0; i <= numberOfWeekToDisplay; i++) {
      this.allweeks.push(startingWeek.add(1, 'weeks').unix());
    }
  }

  onSubmit() {
    const duplicatedAndSelected: number[][] = [this.duplicatedWeeks, this.selectedWeeks];
    const idEtablissement: number = this.userService.getCurrentUserLogged().idEtablissement;
    this.creneauService.duplicateWeeksSelected(duplicatedAndSelected,idEtablissement);
  }

  onReset() {
    this.route.navigate(['/profile']);
  }
}

