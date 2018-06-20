import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { map, startWith} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Message} from "../model/model.message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private options = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: Http

  ) { }

  getMessages(idEleve:number , idEtablissement: number) {
    const url = environment.API_URL +  '/etablissements/' + idEtablissement + '/messages/eleves/' + idEleve;
    return this.http.get(url).pipe(map((resp: Response)=>resp.json()));
  }

  postMessage(idEtablissement: number,message: Message ){
    const url = environment.API_URL +  '/etablissements/' + idEtablissement + '/messages';
    this.http.post(url, message, this.options).subscribe( res =>
      console.log("Message post")
    );  
  }
}
