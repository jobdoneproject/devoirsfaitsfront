import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router, ActivatedRoute} from "@angular/router";
import {environment} from '../../../environments/environment';
import {AuthService} from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { Observable, Subscriber, Subscription, BehaviorSubject } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Scope } from '@angular/core/src/profile/wtf_impl';
import { Subject } from 'rxjs/Subject';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import * as _ from 'underscore';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  typeUtilisateur:string;
  titrePage:string;
  currentUser: User;
  isAdministrateur: boolean;
  idEtablissement: number;
  utilisateurs$: BehaviorSubject<User[]>;
  filterDisponibles = [{nom:'Oui', select:'disponible', checked:true, value:true} ,{nom:'Non', select:'indisponible', checked:true, value:false}];
  classeDisponibles = ['Toutes'];
  nomDisponibles = [];
  filterParClasse: string = "Toutes";
  filterParNom: string;
  selectedUtilisateurs: User[] = [];
  isSelected: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private http: Http,
    private route: ActivatedRoute,
    private userService:UserService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {

    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type']});
    if (this.typeUtilisateur == "eleve"){
      this.titrePage = "Élèves";
    } else if (this.typeUtilisateur == "professeur"){
      this.titrePage = "Professeurs";
    }

    this.currentUser = this.userService.getCurrentUserLogged();
    this.idEtablissement = this.currentUser.idEtablissement;

    if (this.currentUser.privilege == "Administrateur"){
      this.isAdministrateur = true;
    }


    this.userService.getUsers(this.typeUtilisateur, this.currentUser.idEtablissement).subscribe(newUsers => {

      this.utilisateurs$ = new BehaviorSubject<Array<User>>(newUsers);

      this.utilisateurs$.forEach(arrayClasseUtilisateur => {
        arrayClasseUtilisateur.forEach(utilisateur => {
          if (this.classeDisponibles.indexOf(utilisateur.classe) == -1 ){
            this.classeDisponibles.push(utilisateur.classe);
          }
        })
      });
  
      this.utilisateurs$.forEach(arrayNomUtilisateur => {
        arrayNomUtilisateur.forEach(utilisateur => {
          if (this.nomDisponibles.indexOf(utilisateur.nom) == -1 ){
            this.nomDisponibles.push(utilisateur.nom);
          }
        })
      });
      
    });
  
  }

  ngOnInit() {
   }

  redirectEditUser(idUtilisateur: number) {
    this.router.navigate(['edition-utilisateur/' + this.typeUtilisateur + '/' + idUtilisateur]);
  }

  redirectNewUser(){
    this.router.navigate(['creation-utilisateur/' + this.typeUtilisateur]);
  }

  redirectImportUsers(){
    this.router.navigate(['import/']);
  }

  checked() {
    return this.filterDisponibles.filter(utilisateur => { return utilisateur.checked; });
  }

  onChangeClasse(optionDuMenu) {
    this.filterParClasse = optionDuMenu;
  }
  onChangeNom(optionDuMenu) {
    this.filterParNom= optionDuMenu;
  }

  onSelectAll(selection){
    if (selection.checked){
      this.utilisateurs$.forEach(utilisateurs => {
        utilisateurs.forEach(utilisateur => {
          this.selectedUtilisateurs.push(utilisateur);
          this.isSelected = true;
        })
      });
    } else {
      this.selectedUtilisateurs.splice(0,this.selectedUtilisateurs.length);
      this.isSelected = false;
    }
  }

  updateDisponibilite(idUtilisateur){
    this.userService.updateDisponibilite(this.typeUtilisateur, this.currentUser.idEtablissement, idUtilisateur);
  }

  switchSelectedUtilisateur(selectedUtilisateur: User, selection) {
    if (selection.checked) {
      this.selectedUtilisateurs.push(selectedUtilisateur);
    } else {
      const indexUtilisateur = this.selectedUtilisateurs.findIndex(u => u.idUtilisateur == selectedUtilisateur.idUtilisateur);
      if (indexUtilisateur >=0) {
        this.selectedUtilisateurs.splice(indexUtilisateur,1);
      }
    }
  }

  
  actionSelectAll(event){
    if (event == "supprimer") {
      if(confirm("Voulez-vous vraiment supprimer " + this.selectedUtilisateurs.length + " " + this.typeUtilisateur + "(s) ?")){
        this.userService.deleteUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs);
        this.userService.getUsers(this.typeUtilisateur, this.currentUser.idEtablissement).subscribe(newUsers => {
          this.utilisateurs$.next(newUsers);
        });
        this.selectedUtilisateurs.splice(0,this.selectedUtilisateurs.length);
        this.isSelected = false;
      }
    }

    if (event == "disponible") {
      this.selectedUtilisateurs.forEach(utilisateur => {
        utilisateur.disponible = true;
      });
      this.userService.updateUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs); 
    }

    if (event == "indisponible") {
        this.selectedUtilisateurs.forEach(utilisateur => {
          utilisateur.disponible = false;
        });
        this.userService.updateUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs); 

      }
    document.forms["actiongroupee"].reset();
  }

}
