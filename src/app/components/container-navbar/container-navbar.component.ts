import { Component, OnInit } from '@angular/core';

//import { NavBarLinksService } from '../../services/nav-bar-links.service';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-container-navbar',
  templateUrl: './container-navbar.component.html',
  styleUrls: ['./container-navbar.component.css']
})
export class ContainerNavbarComponent implements OnInit {

  currentUser: User;
  administrateur: boolean;
  professeur: boolean;
  eleve: boolean;
  
  constructor(public authService: AuthService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }else if (this.currentUser.privilege == "Professeur"){
      this.professeur = true;
    }else{
      this.eleve = true;
    }
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
