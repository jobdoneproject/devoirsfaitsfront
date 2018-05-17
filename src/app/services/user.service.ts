import { Injectable } from '@angular/core';
// import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import {User} from "../model/model.user";
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import "rxjs/Rx";
import { Url } from 'url';
import { USERS } from '../mock-user';
import { Http, Headers, RequestOptions,Response} from '@angular/http';


@Injectable()
export class UserService {

  searchedUser: User;
  users: User[];

  private url = 'http://localhost:8080/eleve/'; // Changer par url prod


  constructor(
    // private http: Http,
    private httpClient: HttpClient
  ) { }

  getCurrentUser(): Observable<User> {
    return this.getCurrentUser();
  } 

  // UTILISE MOCK
  getUserById(id): Observable<User> {
    // Récupération all users
    this.users = USERS;
    this.searchedUser = this.findById(this.users, id);
    console.log('searchedUser : ' + this.searchedUser);
    return of(this.searchedUser);
  }



  getUserByIdSecond(id){
    console.log('url : ' + this.url + 'eleve/' + id)
    return this.httpClient.get(this.url + 'eleve/' + id);
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
