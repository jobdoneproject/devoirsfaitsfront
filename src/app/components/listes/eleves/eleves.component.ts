import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../../model/model.user";
import {Router} from "@angular/router";
import {environment} from '../../../../environments/environment';
import {AuthService} from "../../../services/auth.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';


@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ElevesComponent implements OnInit {
  currentUser: User;
  administrateur: boolean;
  errorMessage:string;
  idEtablissement: number;
  url: string;
  eleves: Observable<User>;
  filterItems = [{nom:'disponible', select:'disponible', checked:true, value:true} ,{nom:'indisponible', select:'indisponible', checked:true, value:false}];

  constructor(public authService: AuthService, public router: Router,private http: Http) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;
    
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);
    if (this.currentUser.privilege == "Administrateur"){
      
      this.administrateur = true;
    }

    this.url = environment.API_URL+"/eleve/etablissement/"+this.currentUser.idEtablissement;
    this.eleves = this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));
    //pipe(map((res: Response) => res.json())).subscribe;
    
  }

  ngOnInit() {  }


  eleve: User;

  onSelect(eleve: User): void {
    this.eleve = eleve;
  }
  redirectEditUser(idEleve: number) {
    this.router.navigate(['edition-utilisateur/' + idEleve]);
  }

  checked() {
    return this.filterItems.filter(eleve => { return eleve.checked; });
  }
}
