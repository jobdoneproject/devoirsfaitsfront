import { Component, OnInit } from '@angular/core';

//import { NavBarLinksService } from '../../services/nav-bar-links.service';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import * as $ from 'jquery';
import { map} from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-container-navbar',
  templateUrl: './container-navbar.component.html',
  styleUrls: ['./container-navbar.component.css']
})
export class ContainerNavbarComponent implements OnInit {

  nomEtablissement: String;
  currentUser: User;
  administrateur: boolean;
  professeur: boolean;
  eleve: boolean;
  url:string;
  etablissements: Observable<any> ;
  
  constructor(private userService: UserService, public authService: AuthService, public router: Router,private http: Http) {
    this.currentUser = this.userService.getCurrentUserLogged();
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }else if (this.currentUser.privilege == "Professeur"){
      this.professeur = true;
    }else{
      this.eleve = true;
    }
    this.url = environment.API_URL+"/etablissement/"+this.currentUser.idEtablissement;
     this.etablissements = this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));

    this.etablissements.forEach(etablissement => {
      this.nomEtablissement = etablissement.nomEtablissement;

    });
  }  

  

  
  ngOnInit() {
    (function($) {
      'use strict';
      $(function() {
        $('[data-toggle="offcanvas"]').on("click", function() {
          $('.sidebar-offcanvas').toggleClass('active')
        });
      });
    })(jQuery);
  
  }

  // login out from the app
  logOut() {
    this.authService.logOut()
      /*.subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });*/
    this.router.navigate(['/login']);
  }
}
