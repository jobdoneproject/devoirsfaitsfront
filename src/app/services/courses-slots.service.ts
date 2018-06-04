import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseSlot } from '../model/model.course-slots';
import { User } from "../model/model.user"; 
import { WeekDay } from '../model/model.week-day';
import { WeekUtils } from '../utils/WeekUtils';

import {filter, forEach} from 'underscore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseSlotsService {

  constructor(private httpClient: HttpClient) { }

  fetchSlots(id: number, year: number, week:number): Observable<CourseSlot []>
  {
    return this.httpClient.get<CourseSlot []>(environment.API_URL + "/etablissement/1/creneaux?year="+ year + "&week=" + week );
  }
}
