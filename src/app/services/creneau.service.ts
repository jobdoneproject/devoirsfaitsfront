import { Injectable } from '@angular/core';
import { CourseSlot } from "./../model/model.courseslot";
import { User } from "./../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Moment } from 'moment';
import { Room } from '../model/model.room';
import {environment} from '../../environments/environment';


@Injectable()
export class CreneauService {

  constructor(private http: Http) { }


  createSlot(debut:number, fin:number, eleves:User[], profs:User[], 
              salle:Room, idEtablissement: number) {
    let newCreneau: CourseSlot = { id: null, dateDebut: 0, dateFin: 0, 
                                profs: [], eleves: [], salle: null };
    newCreneau.dateDebut = debut;
    newCreneau.dateFin = fin;
    newCreneau.eleves = eleves;
    newCreneau.profs = profs;
    newCreneau.salle = salle;
    this.postSlot(newCreneau, idEtablissement);
  }

  postSlot(newCreneau:CourseSlot, idEtablissement: number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newCreneau);
    let url = environment.API_URL + "/etablissement/" + idEtablissement + "/creneaux";
    this.http.post(
      url, 
      body, 
      options 
    ).subscribe(res => console.log(res.json()));
  }
}
