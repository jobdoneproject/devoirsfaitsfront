import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser(): Observable<User> {
    return this.getCurrentUser();
  }
}
