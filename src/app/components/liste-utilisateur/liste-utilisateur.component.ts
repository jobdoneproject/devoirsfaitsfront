import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router, ActivatedRoute} from "@angular/router";
import {environment} from '../../../environments/environment';
import {AuthService} from "../../services/auth.service";
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Scope } from '@angular/core/src/profile/wtf_impl';
import { Subject } from 'rxjs/Subject';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';

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
  utilisateurs: Observable<any>;
  filterDisponibles = [{nom:'Oui', select:'disponible', checked:true, value:true} ,{nom:'Non', select:'indisponible', checked:true, value:false}];
  classeDisponibles = ['Toutes'];
  nomDisponibles = [];
  filterParClasse: string = "Toutes";
  filterParNom: string;
  utilisateur: User;

  constructor(
    public authService: AuthService, 
    public router: Router,
    private http: Http,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type']});  
    if (this.typeUtilisateur == "eleve"){
      this.titrePage = "Élèves";
    } else if (this.typeUtilisateur == "professeur"){
      this.titrePage = "Professeurs";
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;
    
    if (this.currentUser.privilege == "Administrateur"){
      
      this.administrateur = true;
    }

    this.url = environment.API_URL+"/" + this.typeUtilisateur + "/etablissement/"+this.currentUser.idEtablissement;
    this.utilisateurs = this.http.get(this.url).pipe(map((resp: Response)=>resp.json()));

    this.utilisateurs.forEach(arrayClasseUtilisateur => {
      arrayClasseUtilisateur.forEach(utilisateur => {
        if (this.classeDisponibles.indexOf(utilisateur.classe) == -1 ){
          this.classeDisponibles.push(utilisateur.classe);
        }
      })
    });

    this.utilisateurs.forEach(arrayNomUtilisateur => {
      arrayNomUtilisateur.forEach(utilisateur => {
        if (this.nomDisponibles.indexOf(utilisateur.nom) == -1 ){
          this.nomDisponibles.push(utilisateur.nom);
        }
      })
    });

  }

  ngOnInit() {  }
  
  onSelect(utilisateur: User): void {
    this.utilisateur = utilisateur;
  }
  redirectEditUser(idUtilisateur: number) {
    this.router.navigate(['edition-utilisateur/' + idUtilisateur]);
  }

  checked() {
    return this.filterDisponibles.filter(utilisateur => { return utilisateur.checked; });
  }

  onChange(optionDuMenu) {
    this.filterParClasse = optionDuMenu;
  }
  onChangeNom(optionDuMenu) {
    this.filterParNom= optionDuMenu;
  }

}
