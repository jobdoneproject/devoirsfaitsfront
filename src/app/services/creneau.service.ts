import { Injectable } from '@angular/core';
import { CourseSlot } from "./../model/model.courseslot";
import { User } from "./../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Moment } from 'moment';
import { Room } from '../model/model.room';



@Injectable()
export class CreneauService {

  newCreneau: CourseSlot = { id: null, dateDebut: 0, dateFin: 0, profs: [], eleves: [], salle: null };

  constructor() { }


  createSlot(debut:number, fin:number, eleves:User[], profs:User[], salle:Room ) {
    this.newCreneau.dateDebut = debut;
    this.newCreneau.dateFin = fin;
    this.newCreneau.eleves = eleves;
    this.newCreneau.profs = profs;
    this.newCreneau.salle = salle;
    this.postSlot(this.newCreneau);
    console.log(profs);
  }

  postSlot(newCreneau:CourseSlot) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newCreneau);
    //this.http.post('/api/etablissement/'+this.currentUser.idEtablissement+'/creneaux/', body, options ).map((res: Response) => res.json());
  }
}
