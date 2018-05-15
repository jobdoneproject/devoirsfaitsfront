import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {Http} from "@angular/http";
import {AppComponent} from "../app.component";

@Injectable()
export class AccountService {
  constructor(public http: Http) { }

  createAccount(User: User ){
    return this.http.post(AppComponent.API_URL+'/account/register',User)
      .map(resp=>resp.json());
  }
}
