import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { map, startWith} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: Http

  ) { }

  getMessages(idEleve:number , idEtablissement: number) {
    const url = environment.API_URL +  '/etablissements/' + idEtablissement + '/messages/eleves/' + idEleve;
    return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
  }
}
