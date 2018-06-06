import { Injectable } from '@angular/core';
import { Room } from "../model/model.room";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { Url } from 'url';
import {environment} from '../../environments/environment';
import { map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  room:Room = {id_etablissement:null, idSalle:null, nom:""};
  options:RequestOptions;
  url:string;
    
  constructor(private http: Http) { }

  createNew (idEtablissement:number, name:String) {
    this.url = environment.API_URL+"/etablissements/" + idEtablissement + "/salles";
    this.http.post(this.url, {"nom":name}).subscribe(res => console.log(res.json()));
  }

  getAll (idEtablissement:number): Observable<any> {
    this.url = environment.API_URL+"/etablissements/" + idEtablissement + "/salles/";
    return this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));
  }

  getById (idEtablissement:number, id:number) {
    this.url = environment.API_URL+"/etablissements/" + idEtablissement + "/salles/" + id + "/";
    return this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));
  }

  deleteSelected (idEtablissement:number, id:number) {
    this.url = environment.API_URL+"/etablissements/" + idEtablissement + "/salles/" + id + "/";
    return this.http.delete(this.url).subscribe(res => console.log(res.json()));
  }

  updateSelected (idEtablissement:number, id:number, name:string) {
    this.room.nom = name;
    this.url = environment.API_URL+"/etablissements/" + idEtablissement + "/salles/" + id + "/";
    let body = JSON.stringify(this.room);
    this.http.put(this.url, body, this.options ).subscribe(res => console.log(res.json()));
  }
}
