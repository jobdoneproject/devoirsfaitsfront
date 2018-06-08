import { Component, OnInit } from '@angular/core';
import { User } from '../../model/model.user';
import * as moment from 'moment';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-duplicate-week',
  templateUrl: './duplicate-week.component.html',
  styleUrls: ['./duplicate-week.component.scss']
})
export class DuplicateWeekComponent implements OnInit {

  selectedHero: User;
  week: number;
  allweeks: Date[] = [];

  constructor() { }
 
  ngOnInit() {
    this.week = moment().week();
    for (var i=0; i <= 53; i++) {
      this.allweeks.push(moment().add(i, 'week').toDate());
    }
  }
}

