import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { Observable, Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  currentUser: User;
  url: string;
  etablissements: Observable<any> ;
  nomEtablissement:string;
  constructor(public authService: AuthService,private http: Http) { 

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

     this.url = environment.API_URL+"/etablissement/"+this.currentUser.idEtablissement;
     this.etablissements = this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));
     //console.log(this.etablissements); 

    this.etablissements.forEach(etablissement => {
      this.nomEtablissement = etablissement.nomEtablissement;
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    require("../../../../node_modules/jquery/dist/jquery.js");
    require("../../../assets/js/jquery-3.3.1.slim.min.js");
  
  }

}
