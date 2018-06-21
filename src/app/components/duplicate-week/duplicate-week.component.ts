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



  constructor(
    private userService: UserService, 
    private creneauService: CreneauService, 
    private _Activatedroute:ActivatedRoute, 
    private route: Router) { }

  ngOnInit() {
    const param = this._Activatedroute.snapshot.params['semaines'];
    this.duplicatedWeeks = JSON.parse(param);
  }

  setStartDate(date: Date) {
    this.startDate = date;
    const year = Number(date.toString().substring(0, 4));
    const weekNumber = Number(date.toString().substring(6, 9));
    this.startDate = moment().hour(4).day('monday').week(weekNumber-1).year(year).startOf('day').toDate();
  }

  setEndDate(date: Date) {
    this.selectedWeeks = [];  //sinon le pré-cochage n'est pas effectif sans une interraction de notre part
    this.allweeks = []; //clean du tableau pour un refresh
    const startingWeek = moment(this.startDate);
    const numberOfWeekToDisplay = moment(date).diff(startingWeek, 'weeks');
    for (var i = 0; i < numberOfWeekToDisplay; i++) {
      this.allweeks.push(startingWeek.add(1, 'weeks').unix());
    }
  }

  onSubmit() {
    const duplicatedAndSelected: number[][] = [this.duplicatedWeeks, this.selectedWeeks];
    const idEtablissement: number = this.userService.getCurrentUserLogged().idEtablissement;
    this.creneauService
      .duplicateWeeksSelected(duplicatedAndSelected,idEtablissement)
      .subscribe(data => {
        // console.log(data);
        this.route.navigate(['/profile']);
      });
  }

  onReset() {
    this.route.navigate(['/profile']);
  }

  messageCopy() {
    if (this.selectedWeeks) {
    return "Vous allez dupliquer " + this.duplicatedWeeks.length + " semaine(s) vers " + this.selectedWeeks.length + " semaine(s) .";
    }
    return "Vous n'avez sélectionné aucune période pour la duplication.";
  }

  weeksSelectedToString() {
    let message: String = "";
    this.duplicatedWeeks.forEach(function (value) {
      message += " - " + moment(value*1000).format("w/Y");
    });
    return message;
  }

  ifWeeksSelected(){
    if(this.selectedWeeks) {
      return false;
    }
    return true;
  }
}

