import { Component, OnInit } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AuthService} from "../../services/auth.service";
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-container-sidebar',
  templateUrl: './container-sidebar.component.html',
  styleUrls: ['./container-sidebar.component.css']
})
export class ContainerSidebarComponent implements OnInit {

  currentUser: User;
  administrateur: boolean;
  errorMessage:string;
  idEtablissement: number;
  url: string;
  listEleve: Observable<any>;

  constructor(public authService: AuthService, public router: Router,private http: Http) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;
    
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);
    if (this.currentUser.privilege == "Administrateur"){
      
      this.administrateur = true;
    }
  }

  ngOnInit() {
  }


}
