import { Injectable } from '@angular/core';
import { User } from '../user';
import {Http} from '@angular/http';
import {AppComponent} from '../app.component';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
  constructor(public http: Http) { }

  /*createAccount(user: User) {
    return this.http.post(AppComponent.API_URL + '/account/register', user)
      .pipe(map(resp => resp.json()));
  }*/

}
