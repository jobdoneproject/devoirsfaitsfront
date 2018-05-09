import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from './user';
import { USER } from './mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser(): Observable<User[]> {
    return of(USER);
  }
}
