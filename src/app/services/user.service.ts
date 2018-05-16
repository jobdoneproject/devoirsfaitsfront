import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';

import {User} from "../model/model.user";



export class UserService {

  constructor() { }

  getCurrentUser(): Observable<User> {
    return this.getCurrentUser();
  }

  getUserById(id){

  }
}
