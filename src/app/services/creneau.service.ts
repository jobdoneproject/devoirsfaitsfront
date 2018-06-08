import { Injectable } from '@angular/core';
import { CourseSlot } from "./../model/model.courseslot";
import { User } from "./../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Moment } from 'moment';
import { Room } from '../model/model.room';
import {environment} from '../../environments/environment';



@Injectable()
export class CreneauService {

  newCreneau: CourseSlot = { idCreneau: null, dateDebut: 0, dateFin: 0, professeurs: [], eleves: [], salle: null };

  constructor(private http: Http) { }


  createSlot(debut:number, fin:number, eleves:User[], profs:User[], salle:Room ) {
    this.newCreneau.dateDebut = debut;
    this.newCreneau.dateFin = fin;
    this.newCreneau.eleves = eleves;
    this.newCreneau.professeurs = profs;
    this.newCreneau.salle = salle;
    this.postSlot(this.newCreneau);
  }

  postSlot(newCreneau:CourseSlot) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newCreneau);
    this.http.post('http://localhost:8080/etablissements/1/creneaux', body, options ).subscribe(res => console.log(res.json()));
  }

  deleteSelected (idEtablissement:number, id:number) {
    const url = environment.API_URL+"/etablissements/" + idEtablissement + "/creneaux/" + id + "/";
    console.log(url);
    return this.http.delete(url).subscribe(res => console.log(res.json()));
  }
}
