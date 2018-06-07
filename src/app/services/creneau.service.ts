import { Injectable } from '@angular/core';
import { CourseSlot } from "./../model/model.courseslot";
import { User } from "./../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Moment } from 'moment';
import { Room } from '../model/model.room';
import { environment} from '../../environments/environment';
import { map, startWith} from 'rxjs/operators';
import { HttpClient} from  '@angular/common/http';

@Injectable()
export class CreneauService {

  constructor(private http: Http,
              private  httpClient:  HttpClient) {}


  createSlot(debut:number, fin:number, eleves:User[], profs:User[], 
              salle:Room, idEtablissement: number) {
    let newCreneau: CourseSlot = { id: null, dateDebut: 0, dateFin: 0, 
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
    let url = environment.API_URL + "/etablissement/" + idEtablissement + "/creneaux";
    console.log("body");
    console.log(body);
    this.http.post(
      url, 
      body, 
      options 
    ).subscribe(res => console.log(res.json()));
  }

  getSlot(idEtablissement: number, idCreneau: number){
    const url =  environment.API_URL + "/etablissement/" + idEtablissement + "/creneaux/" + idCreneau;
    // return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
    return  this.httpClient.get(environment.API_URL + "/etablissement/" + idEtablissement + "/creneaux/" + idCreneau);
  }
}
