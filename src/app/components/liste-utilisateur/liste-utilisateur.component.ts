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
import { Location } from '@angular/common';
import * as $ from 'jquery';
import * as _ from 'underscore';
import {EleveClassesPipe} from '../../pipes/eleve-classes.pipe'
@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  pipeClass: EleveClassesPipe = new EleveClassesPipe;
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

    $(".custom-select").each(function() {
      var classes = $(this).attr("class"),
          id      = $(this).attr("id"),
          name    = $(this).attr("name");
      var template =  '<div class="' + classes + '">';
          template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
          template += '<div class="custom-options">';
          $(this).find("option").each(function() {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
          });
      template += '</div></div>';
      
      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function() {
      $(this).parents(".custom-options").addClass("option-hover");
    }, function() {
      $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function() {
      $('html').one('click',function() {
        $(".custom-select").removeClass("opened");
      });
      $(this).parents(".custom-select").toggleClass("opened");
      event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
      $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
      $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
      $(this).addClass("selection");
      $(this).parents(".custom-select").removeClass("opened");
      $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });
   }

  redirectEditUser(idUtilisateur: number) {
    this.router.navigate(['edition-utilisateur/' + this.typeUtilisateur + '/' + idUtilisateur]);
  }

  redirectNewUser(){
    this.router.navigate(['creation-utilisateur/' + this.typeUtilisateur]);
  }

  redirectImportUsers(){
    this.router.navigate(['import-' + this.typeUtilisateur + 's/']);
  }

  redirectMessageUser(idUtilisateur: number){
    this.router.navigate(['messages/' + idUtilisateur +'#fin']);

  }

  checked() {
    return this.filterDisponibles.filter(utilisateur => { return utilisateur.checked; });
  }

  onChangeClasse(optionDuMenu) {
    this.filterParClasse = optionDuMenu;
  }
  onChangeNom(optionDuMenu : string) {
    this.filterParNom = optionDuMenu;
  }

  onSelectAll(selection){
    if (selection.checked){
      this.utilisateurs$.forEach(utilisateurs => {
        utilisateurs.forEach(utilisateur => {
          this.selectedUtilisateurs.push(utilisateur);
        })
      });
    } else {
      this.selectedUtilisateurs.splice(0,this.selectedUtilisateurs.length);
      this.utilisateurs$.forEach(utilisateurs => {
        utilisateurs.forEach(utilisateur => {
          utilisateur.selected = false;
        })
      })
    }

    if (this.filterParClasse != "Toutes"){
      this.selectedUtilisateurs = this.selectedUtilisateurs.filter(s => s.classe.includes(this.filterParClasse));
    }

    if (this.filterParNom != null){
      var regex = new RegExp('.*' + this.filterParNom + '.*', 'i');
      this.selectedUtilisateurs = this.selectedUtilisateurs.filter(s => regex.test(s.nom));
    }
    console.log(this.selectedUtilisateurs.length);

    this.selectedUtilisateurs.forEach(utilisateur => {
       utilisateur.selected = true;
    });
  }

  updateDisponibilite(idUtilisateur){
    this.userService.updateDisponibilite(this.typeUtilisateur, this.currentUser.idEtablissement, idUtilisateur);
  }

  switchSelectedUtilisateur(selectedUtilisateur: User, selection) {
    if (selection.checked) {
      this.selectedUtilisateurs.push(selectedUtilisateur);
    } else {
      const indexUtilisateur = this.selectedUtilisateurs.findIndex(u => u.idUtilisateur == selectedUtilisateur.idUtilisateur);
      if (indexUtilisateur >= 0) {
        this.selectedUtilisateurs.splice(indexUtilisateur,1);
      }
    }
  }

  actionDemandee: string;
  action(event){
    this.actionDemandee = event;
  }

  actionsGroupees(){
    // const event = document.getElementById('selectAction').nodeValue;
     console.log(this.actionDemandee)
    if (this.actionDemandee == "supprimer") {
      if(confirm("Voulez-vous vraiment supprimer " + this.selectedUtilisateurs.length + " " + this.typeUtilisateur + "(s) ?")){
        this.userService.deleteUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs);
        this.userService.getUsers(this.typeUtilisateur, this.currentUser.idEtablissement).subscribe(newUsers => {
          this.utilisateurs$.next(newUsers);
        });
        this.selectedUtilisateurs.splice(0,this.selectedUtilisateurs.length);
        this.isSelected = false;
      }
    }

    if (this.actionDemandee == "disponible") {
      this.selectedUtilisateurs.forEach(utilisateur => {
        utilisateur.disponible = true;
      });
      this.userService.updateUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs); 
    }

    if (this.actionDemandee == "indisponible") {
        this.selectedUtilisateurs.forEach(utilisateur => {
          utilisateur.disponible = false;
        });
        this.userService.updateUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs); 

      }

    console.log("collect : " + this.selectedUtilisateurs.length);

    console.log("action : " + event);
    //document.forms["actiongroupee"].reset();
  }

}
