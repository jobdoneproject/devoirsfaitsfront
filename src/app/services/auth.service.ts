import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { User } from '../user';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(public http: Http) { }

  public logIn(user: User) {

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    // creating base64 encoded String from user name and password
    const base64Credential: string = btoa( user.mail + ':' + user.password);
    headers.append('Authorization', 'Basic ' + base64Credential);

    const options = new RequestOptions();
    options.headers = headers;

    const resp = this.http.get(AppComponent.API_URL + '/account/login' ,   options);

    return resp.subscribe( (response: Response) => {
      const loggedUser = response.json().principal;
      if (loggedUser) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }
    );
}

  logOut() {
    // remove user from local storage to log user out
    return this.http.post(AppComponent.API_URL + 'logout', {})
      .pipe(map((response: Response) => {
        localStorage.removeItem('currentUser');
      }));

  }

}
