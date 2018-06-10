import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../model/model.user";
import { map, startWith} from 'rxjs/operators';

import "rxjs/Rx";
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {

  searchedUser: User;
  users: User[];

  private options = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: Http
  ) { }

  getCurrentUserLogged() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
 

  getCurrentUser(): Observable<User> {
    return this.getCurrentUser();
  }

  getUsers(typeUtilisateur:string , idEtablissement: number) {
    const url = this.getUtilisateursUrl(idEtablissement, typeUtilisateur) ;
    return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
  }
  
  updateDisponibilite(typeUtilisateur: string, idEtablissement: number, idUtilisateur: number){
    const url = this.getSingleUtilisateurUrl(idEtablissement, typeUtilisateur, idUtilisateur)+"/switch";
    this.http.put( url, "").subscribe(res => console.log("url partie"));
  }

  updateUsers(typeUtilisateur: string, idEtablissement: number, utilisateurs: User[]){
    const url = this.getUtilisateursUrl(idEtablissement, typeUtilisateur);
    this.http.put(url, JSON.stringify(utilisateurs), this.options).subscribe(res => console.log("url partie"));
  }

  getUser(typeUtilisateur: string, idEtablissement: number, idUtilisateur: number){
    const url = this.getSingleUtilisateurUrl(idEtablissement, typeUtilisateur, idUtilisateur);
    return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
  }

  postUser(typeUtilisateur: string, idEtablissement: number, utilisateur: User){
    const url = this.getUtilisateursUrl(idEtablissement, typeUtilisateur);
    this.http.post(url, utilisateur, this.options).subscribe( res =>
      console.log("Subscribed")
    );
  }

  putUser(typeUtilisateur: string, idEtablissement: number, utilisateur: User){
    const url = this.getSingleUtilisateurUrl(idEtablissement, typeUtilisateur, utilisateur.idUtilisateur);
    this.http.put(url, JSON.stringify(utilisateur), this.options).subscribe(res => console.log("url partie"));
  }

  deleteUser(typeUtilisateur: string, idEtablissement: number, idUtilisateur: number){
    const url = this.getSingleUtilisateurUrl(idEtablissement, typeUtilisateur, idUtilisateur);
    return this.http.delete(url).subscribe(res => console.log("url partie"));
  }

  deleteUsers(typeUtilisateur: string, idEtablissement: number, utilisateurs: User[]){
    const url = this.getUtilisateursUrl(idEtablissement, typeUtilisateur);
    this.http.delete(url,new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: utilisateurs
   })).subscribe(res => true);
  }

  getImportStudentsURL(idEtablissement: number){
    return environment.API_URL + '/etablissements/'+ idEtablissement+ '/eleves/import/';
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  findById(source, id) {
    for (let i = 0; i < source.length; i++) {
      if (source[i].id === id) {
        return source[i];
      }
    }
    return null;
  }

  /**
   * Renvoie l'url de base de l'API pour le type d'utilisateurs donné
   * @param idEtablissement
   * @param typeUtilisateur
   */
  private getUtilisateursUrl(idEtablissement: number, typeUtilisateur: string): string {
    return environment.API_URL + '/etablissements/'+ idEtablissement+ '/' + typeUtilisateur +'s';
  }

  /**
   * Renvoie l'url de base de l'API pour un utilisateur particulier
   * @param idEtablissement
   * @param typeUtilisateur
   * @param idUtilisateur
   */
  private getSingleUtilisateurUrl(idEtablissement: number, typeUtilisateur: string, idUtilisateur): string {
    return this.getUtilisateursUrl(idEtablissement, typeUtilisateur) + '/' + idUtilisateur;
  }

}
