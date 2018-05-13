import { Component, OnInit } from '@angular/core';
//import { NavBarLinksService } from '../../services/nav-bar-links.service';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
  navBarLinks;
  

  //constructor(private navBarLinksService: NavBarLinksService) { }

  ngOnInit() {
    //this.navBarLinks = this.navBarLinksService.getLinks();
  }
     

}
