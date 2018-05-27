import {Pipe,Component, Injectable, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { Transform } from 'stream';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent {
  now: any;
  nextSunday: any;
  firstMonday: Date;
  year: number;
  month: number;
  @Input()
  weeknum: Date;

  update() {
    this.year = Number(this.weeknum.toString().substring(0, 4));
    this.month = Number(this.weeknum.toString().substring(6, 9));
    this.now = moment().day("monday").year(this.year).week(this.month).toDate().toLocaleDateString();
    this.nextSunday = moment().day("monday").year(this.year).week(this.month).add(6, 'days').toDate().toLocaleDateString();
  }
  
}