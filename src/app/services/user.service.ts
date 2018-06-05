import { Injectable } from '@angular/core';
// import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import {User} from "../model/model.user";
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { map, startWith} from 'rxjs/operators';

import "rxjs/Rx";
import { Url } from 'url';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {

  searchedUser: User;
  users: User[];

  //private url = 'http://localhost:8080/eleve/'; // Changer par url prod
  constructor(
    // private http: Http,
    private httpClient: HttpClient,
    private http: Http
  ) { }

  getCurrentUser(): Observable<User> {
    return this.getCurrentUser();
  } 

  getUsers(typeUtilisateur:string , idEtablissement: number) {
    const url = environment.API_URL+"/" + typeUtilisateur + "/etablissement/" + idEtablissement;
    return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
  }

  updateDisponibilite(typeUtilisateur: string, idUtilisateur: number){
    const url = environment.API_URL+"/" + typeUtilisateur + "/disponible/" + idUtilisateur;
    this.http.put( url, "").subscribe(res => console.log("url partie"));
  }

  getUser(typeUtilisateur: string, idUtilisateur: number){
    const url = environment.API_URL+"/" + typeUtilisateur + "/" + idUtilisateur;
    return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
  }

  postUser(typeUtilisateur: string, nouvelUtilisateur: User){
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    const url ="http://localhost:8080" + "/" + typeUtilisateur;
    this.http.post(url, JSON.stringify(nouvelUtilisateur), options)
    .map((resp: Response)=>resp.json())
    .subscribe(res => console.log("url partie" + res));
  }

  putUser(typeUtilisateur: string, utilisateurUpdate: User){
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    const url = environment.API_URL+"/" + typeUtilisateur + "/" + utilisateurUpdate.idUtilisateur;
    this.http.put(url, JSON.stringify(utilisateurUpdate), options)
             .subscribe(res => console.log("url partie"));
  }

  deleteUser(typeUtilisateur: string, idUtilisateur: number){
    const url = environment.API_URL+"/" + typeUtilisateur + "/" + idUtilisateur;
    return this.http.delete(url).subscribe(res => console.log("url partie"));
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  findById(source, id) {
    for (let i = 0; i < source.length; i++) {
      if (source[i].id === id) {
        console.log(source[i]);
        return source[i];
      }
    }
    return null;
  }

}
