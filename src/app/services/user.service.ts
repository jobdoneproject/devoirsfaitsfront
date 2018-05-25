import { Injectable } from '@angular/core';
// import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { User} from "../model/model.user";
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import "rxjs/Rx";
import { Url } from 'url';
import { USERS } from '../mock-user';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {AppComponent} from "../app.component";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';



@Injectable()
export class UserService {

  searchedUser: User;
  searchedUserObs: Observable<User>;
  users: User[];

  private url = 'http://localhost:8080/'; // Changer par url prod


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
    // this.users = USERS;
    // this.searchedUser = this.findById(this.users, id);
    // console.log('this.users : ' + this.users);
    // console.log('searchedUser : ' + this.searchedUser);
    // return of(this.searchedUser);
    this.searchedUserObs = this.getUserByIdSecond(id);
    console.log('this.sesearchedUserObs : ' + this.searchedUserObs);
    return this.searchedUserObs;
  }

  getUserByIdSecond(id){
    console.log('url : ' + this.url + 'eleve/' + id)
    return this.httpClient.get<User>(this.url + 'eleve/' + id);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  findById(source, id) {
    for (let i = 0; i < source.length; i++) {
      if (source[i].id === id) {
        console.log('source[i] : ' + source[i]);
        return source[i];
      }
    }
    return null;
  }

  // updateUser(user: User): Observable<User> {
  //   return this.httpClient.put(AppComponent.API_URL, user)
  //     .map((res:Response) => res.json())
  //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // editUser(user: User){

  // }

}
