import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from './user';
import { USERS } from './mock-user';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  searchedUser: User;
  users: User[];

  constructor(
    private utilsService: UtilsService,
  ) { }

  getCurrentUser(): Observable<User> {
    return of(USERS[2]);
  }
  getAllUsers(): Observable<User[]> {
    return of(USERS);
  }
  getUserById(id): Observable<User> {
    // Récupération all users
    this.users = USERS;
    this.searchedUser = this.utilsService.findById(this.users, id);
    console.log('searchedUser : ' + this.searchedUser);
    return of(this.searchedUser);
  }
}



