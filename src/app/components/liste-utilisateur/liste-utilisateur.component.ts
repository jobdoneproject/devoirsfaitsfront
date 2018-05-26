import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router, ActivatedRoute} from "@angular/router";
import {environment} from '../../../environments/environment';
import {AuthService} from "../../services/auth.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  typeUtilisateur:string;
  titrePage:string;
  currentUser: User;
  administrateur: boolean;
  errorMessage:string;
  idEtablissement: number;
  url: string;
  utilisateurs: Observable<User>;
  filterItems = [{nom:'disponible', select:'disponible', checked:true, value:true} ,{nom:'indisponible', select:'indisponible', checked:true, value:false}];

  constructor(
    public authService: AuthService, 
    public router: Router,
    private http: Http,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type']});  


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;
    
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);
    if (this.currentUser.privilege == "Administrateur"){
      
      this.administrateur = true;
    }

    this.url = environment.API_URL+"/" + this.typeUtilisateur + "/etablissement/"+this.currentUser.idEtablissement;
    this.utilisateurs = this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));

    if (this.typeUtilisateur == "eleve"){
      this.titrePage = "Élèves";
    } else if (this.typeUtilisateur == "professeur"){
      this.titrePage = "Professeurs";
    }
  }

  ngOnInit() {  }


  utilisateur: User;

  onSelect(utilisateur: User): void {
    this.utilisateur = utilisateur;
  }
  redirectEditUser(idUtilisateur: number) {
    this.router.navigate(['edition-utilisateur/' + idUtilisateur]);
  }

  checked() {
    return this.filterItems.filter(utilisateur => { return utilisateur.checked; });
  }
}
