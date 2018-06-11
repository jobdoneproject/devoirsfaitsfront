import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../model/model.user";
import {Router, ActivatedRoute} from "@angular/router";
import {environment} from '../../../environments/environment';
import {AuthService} from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Scope } from '@angular/core/src/profile/wtf_impl';
import { Subject } from 'rxjs/Subject';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  administrateur: boolean;
  errorMessage:string;
  idEtablissement: number;
  url: string;
  utilisateurs: Observable<any>;
  filterDisponibles = [{nom:'Oui', select:'disponible', checked:true, value:true} ,{nom:'Non', select:'indisponible', checked:true, value:false}];
  classeDisponibles = ['Toutes'];
  nomDisponibles = [];
  IdDisponibles = [];
  isUtilisateurSelected = [];
  filterParClasse: string = "Toutes";
  filterParNom: string;
  utilisateur: User;
  formUsers: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    private http: Http,
    private route: ActivatedRoute,
    private userService:UserService,
    private formBuilder: FormBuilder,
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

    this.utilisateurs = this.userService.getUsers(this.typeUtilisateur, this.currentUser.idEtablissement);

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

    this.utilisateurs.forEach(arrayIdUtilisateur => {
      arrayIdUtilisateur.forEach(utilisateur => {
        if (this.IdDisponibles.indexOf(utilisateur.id) == -1 ){
          this.IdDisponibles.push(utilisateur.id);
        }
      })
    });

    // this.formUsers = this.formBuilder.group({
    //   utilisateurs: this.buildSelected()
    //   });
  
  }

  ngOnInit() {

(function($) {
  $(document).ready(function(){
  // Check or Uncheck All checkboxes
  $("#checkall").change(function(){
    var checked = $(this).is(':checked');
    if(checked){
      $(".checkbox").each(function(){
        $(this).prop("checked",true);
      });
    }else{
      $(".checkbox").each(function(){
        $(this).prop("checked",false);
      });
    }
  });

 // Changing state of CheckAll checkbox
 $(".checkbox").click(function(){

   if($(".checkbox").length == $(".checkbox:checked").length) {
     $("#checkall").prop("checked", true);
   } else {
     $("#checkall").removeAttr("checked");
   }

 });
});
})(jQuery);
   }

  onSelect(utilisateur: User): void {
    this.utilisateur = utilisateur;
  }

  redirectEditUser(idUtilisateur: number) {
    this.router.navigate(['edition-utilisateur/' + this.typeUtilisateur + '/' + idUtilisateur]);
  }

  redirectNewUser(){
    this.router.navigate(['creation-utilisateur/' + this.typeUtilisateur]);
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

  updateDisponibilite(idUtilisateur){
    this.userService.updateDisponibilite(this.typeUtilisateur, this.currentUser.idEtablissement, idUtilisateur);
  }

  state : boolean;
  checkAll(ev) {
    this.utilisateurs.forEach(x => x.state = ev.target.checked);
  }

  isAllChecked() {
    return this.utilisateurs.every(_ => _.state);
  }
  
  // actionSelectAll(event){
  //   var collectChecks = document.getElementsByName('selectedUtilisateur')
 
  //   for (var i=0;i<collectChecks.length;i++){
	// 		if (collectChecks[i].attributes.type === "checkbox"){
	// 			var msg="le checkbox nommé "+ collectChecks[i].name 
	// 			msg+=(collectChecks[i].checked==true)?" est checkée":"n'est pas checkée"
  //       console.log(msg);
  //     }
  //   }
    
  //   const test = this.formBuilder.control(this.utilisateur.disponible);
  //   console.log("action : " + event);
  //   this.isUtilisateurSelected =  _.filter(test, (utilisateur) => { return this.utilisateur.disponible}); 
  //   console.log(this.isUtilisateurSelected);
  // }

  // buildSelected() {
  //   const arr = this.IdDisponibles.map(skill => {
  //     return this.formBuilder.control(this.utilisateur.disponible);
  //   });
  //   return this.formBuilder.array(arr);
  // }
}
