import { Injectable } from '@angular/core';
import {RegisterUser} from "../model/model.registerUser";
import {Http} from "@angular/http";
import {AppComponent} from "../app.component";

@Injectable()
export class AccountService {
  constructor(public http: Http) { }

  createAccount(registerUser: RegisterUser ){
    return this.http.post(AppComponent.API_URL+'/account/register',registerUser)
      .map(resp=>resp.json());
  }
}
