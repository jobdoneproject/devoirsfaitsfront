import { Component, OnInit } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AuthService} from "../../services/auth.service";
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserService} from "../../services/user.service";


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

  constructor(private userService: UserService, public authService: AuthService, public router: Router,private http: Http) { 
    this.currentUser = this.userService.getCurrentUserLogged();
    this.idEtablissement = this.currentUser.idEtablissement;
    if (this.currentUser.privilege == "Administrateur"){
      
      this.administrateur = true;
    }
  }

  ngOnInit() {
  }


}
