import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AuthService} from "../../services/auth.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@Component({
  selector: 'app-page-creneau',
  templateUrl: './page-creneau.component.html',
  styleUrls: ['./page-creneau.component.scss']
})
export class PageCreneauComponent implements OnInit {

  

  public listEleveSelected = [
    { nom: 'Potter', prenom: 'Harry' },
    { nom: 'Weasley', prenom: 'Ron' },
    { nom: 'Granger', prenom: 'Hermione' },
    { nom: 'Malefoy', prenom: 'Drgao'}
];

selectedEleves: User[] = [];
currentUser: User;
administrateur: boolean;
errorMessage:string;
idEtablissement: number;
url: string;
listEleve: Observable<User>;
eleve : User;

constructor(public authService: AuthService, public router: Router,private http: Http) {

  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.idEtablissement = this.currentUser.idEtablissement;
  
  console.log("this.currentUser.privilege : " + this.currentUser.privilege);
  if (this.currentUser.privilege == "Administrateur"){
    
    this.administrateur = true;
  }

  this.url = AppComponent.API_URL+"/eleve/etablissement/"+this.currentUser.idEtablissement;
  this.listEleve = this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));
  console.log(this.listEleve);
  
}

addEleveToSelected(selectedEleve) {
console.log(selectedEleve);
this.selectedEleves.push(selectedEleve);
}

  ngOnInit() {
  }
}
