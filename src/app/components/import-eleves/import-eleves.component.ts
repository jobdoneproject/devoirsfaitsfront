import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";

@Component({
  selector: 'app-import-eleves',
  templateUrl: './import-eleves.component.html',
  styleUrls: ['./import-eleves.component.scss']
})
export class ImportElevesComponent implements OnInit {

  administrateur: boolean;
  currentUser: User;

  constructor(private authService: AuthService) {
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }
  }

}
