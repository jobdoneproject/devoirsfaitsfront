import { Injectable } from '@angular/core';
import { CourseSlot } from "./../model/model.courseslot";
import { User } from "./../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Moment } from 'moment';
import { Room } from '../model/model.room';
import {environment} from '../../environments/environment';
import { HttpClient} from  '@angular/common/http';
import { Router } from "@angular/router";


@Injectable()
export class CreneauService {

  private options = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  newCreneau: CourseSlot = { idCreneau: null, dateDebut: 0, dateFin: 0, professeurs: [], eleves: [], salle: null };

  constructor(private http: Http,
    private  httpClient:  HttpClient,
    public router: Router) {}

  getSlot(idEtablissement: number, idCreneau: number){
    const url =  environment.API_URL + "/etablissement/" + idEtablissement + "/creneaux/" + idCreneau;
    return  this.httpClient.get(environment.API_URL + "/etablissements/" + idEtablissement + "/creneaux/" + idCreneau);
  }

  createSlot(debut:number, fin:number, eleves:User[], profs:User[], 
    salle:Room, idEtablissement: number) {
    let newCreneau: CourseSlot = { idCreneau: null, dateDebut: 0, dateFin: 0, 
    professeurs: [], eleves: [], salle: null };
    newCreneau.dateDebut = debut;
    newCreneau.dateFin = fin;
    newCreneau.eleves = eleves;
    newCreneau.professeurs = profs;
    newCreneau.salle = salle;
    console.log('salle');
    console.log(salle);
    this.postSlot(newCreneau, idEtablissement);
  }

  postSlot(newCreneau:CourseSlot, idEtablissement: number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newCreneau);
    let url = environment.API_URL + "/etablissements/" + idEtablissement + "/creneaux";
    console.log("body");
    console.log(body);
    this.http.post(
      url, 
      body, 
      options 
    ).subscribe(res => {
      console.log(res.json()),
      // window.location.href = environment.API_URL + "/profile";
      // this.router.navigate(['liste/' + this.typeUtilisateur]);
      // this.router.navigate(['/profile']);
      this.router.navigate(['/profile']);
    });
  }

  prepareEditedTimeSlot(idCreneau: number, debut:number, fin:number, eleves:User[], profs:User[], 
                        salle:Room, idEtablissement: number){
    let editedTimeSlot: CourseSlot = { idCreneau: null, dateDebut: 0, dateFin: 0, 
      professeurs: [], eleves: [], salle: null };
    editedTimeSlot.idCreneau = idCreneau;
    editedTimeSlot.dateDebut = debut;
    editedTimeSlot.dateFin = fin;
    editedTimeSlot.eleves = eleves;
    editedTimeSlot.professeurs = profs;
    editedTimeSlot.salle = salle;
    console.log(editedTimeSlot);
    this.putSlot(editedTimeSlot, idEtablissement, idCreneau)
  }

  putSlot(editedCreneau:CourseSlot, idEtablissement: number, idCreneau:number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(editedCreneau);
    let url = environment.API_URL + "/etablissements/" + idEtablissement + "/creneaux/" + idCreneau;
    this.http.put(
      url, 
      body, 
      options 
    ).subscribe(res => {
      console.log(res.json()),
      this.router.navigate(['/profile']);
    });
  }

  deleteSelected (idEtablissement:number, id:number) {
    const url = environment.API_URL+"/etablissements/" + idEtablissement + "/creneaux/" + id + "/";
    console.log(url);
    return this.http.delete(url).subscribe(res => console.log(res.json()));
  }

  duplicateWeeksSelected (duplicatedAndSelectedWeeks : number[][], id: number) {
    const url = environment.API_URL+"/etablissements/" + id + "/creneaux/duplication";
    console.log(JSON.stringify(duplicatedAndSelectedWeeks));
    this.http.post(url, JSON.stringify(duplicatedAndSelectedWeeks), this.options).subscribe(res => console.log(res.json()));
  }
}
