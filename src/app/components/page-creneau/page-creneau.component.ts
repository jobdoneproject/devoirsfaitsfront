import { Component, OnInit, ViewEncapsulation, IterableDiffers, Input, EventEmitter } from '@angular/core';
import { User } from "../../model/model.user";
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { AuthService } from "../../services/auth.service";
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Time } from '@angular/common';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { CreneauService } from '../../services/creneau.service';
import { UserService } from "../../services/user.service";
import { Room } from "../../model/model.room";
import { RoomService } from "../../services/room.service";
import { ActivatedRoute } from '@angular/router';
import { CourseSlot } from "../../model/model.courseslot";



@Component({
  selector: 'app-page-creneau',
  templateUrl: './page-creneau.component.html',
  styleUrls: ['./page-creneau.component.scss']
})

export class PageCreneauComponent implements OnInit {

  selectedEleves: User[] = [];
  selectedProfesseurs: User[] = [];
  selectedProfesseur: any;
  currentUser: User;
  administrateur: boolean;
  errorMessage: string;
  listEleve: Observable<any>;
  listProfesseur: Observable<any>;
  @Input() date_creneau: any;
  @Input() heure_debut: any;
  @Input() heure_fin: any;
  nomDisponibles = [];
  filterParNom: String;
  titre: String;
  myControl: FormControl = new FormControl();
  filteredEleve: Observable<any[]>;
  allSalleEtb: Observable<any>;
  idEtablissement: number;
  selectedSalle: Room;
  selectedSallePut: Room;
  idCreneau: number;
  editedCreneau:CourseSlot;
  salle: Room;
  creneauId: number;
  pageModeCreation: boolean;


  constructor(private roomsv: RoomService, 
              private courseservice: CreneauService, 
              public authService: AuthService, 
              public router: Router, 
              private userService:UserService,
              private route: ActivatedRoute,
              private creneauService: CreneauService) {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("this.currentUser.privilege : " + this.currentUser.privilege);

    this.idEtablissement = this.currentUser.idEtablissement;

    if (this.currentUser.privilege == "Administrateur") {
      this.administrateur = true;
    }

    this.listProfesseur = this.userService.getUsers("professeur", this.currentUser.idEtablissement);
    this.listEleve =  this.userService.getUsers("eleve", this.currentUser.idEtablissement);
    
    this.listEleve.forEach(arrayNomUtilisateur => {
      arrayNomUtilisateur.forEach(utilisateur => {
        if (this.nomDisponibles.indexOf(utilisateur.nom) == -1) {
          this.nomDisponibles.push(utilisateur.nom);
        }
      })
    });

    // this.selectedEleves.forEach(eleve => {
    //   if(!eleve.hasOwnProperty('present')){
    //     eleve.present = true;
    //   }
    // });

    
  }

  ngOnInit() {
    
    console.log(this.route.snapshot.paramMap.get('id'));
    // EDITION CRENEAU
    if(this.route.snapshot.paramMap.get('id') != null){
      this.pageModeCreation = false;
      this.idCreneau = parseInt(this.route.snapshot.paramMap.get('id'),10);
      this.getSlot();

      this.roomsv.getAll(this.currentUser.idEtablissement)
      .subscribe( data =>{
        this.allSalleEtb = data;
        console.log(this.allSalleEtb);
        console.log(this.editedCreneau);

        this.titre = "Créneau du " + 
          moment.unix(this.editedCreneau.dateDebut).format("DD MM YYY à HH:mm");

        this.allSalleEtb.forEach((salle) => {
          console.log(this.editedCreneau.salle.idSalle);
          console.log(salle.idSalle);
          if(this.editedCreneau.salle.idSalle == salle.idSalle){
            console.log("found !");
            this.selectedSalle = salle.idSalle;
          }
        });
      });
    // CREATION CRENEAU
    }else{ 
      console.log("création");
      this.pageModeCreation = true;
      this.titre = "Nouveau créneau";

      this.roomsv.getAll(this.currentUser.idEtablissement)
      .subscribe( data =>{
        this.allSalleEtb = data;
      });
    }
  }


  addEleveToSelected() { 
    let eleveAdded = this.myControl.value;
    let doublon = false;
    this.selectedEleves.forEach(eleve => {
      if(eleve.idUtilisateur === eleveAdded.idUtilisateur){
        // console.log("eleve present");
        doublon = true;
      }
    });
    if(!doublon){
      // If eleveAdded ne contient pas property present, ajout avec true
      if(!eleveAdded.hasOwnProperty('present')){
        eleveAdded.present = true;
      }
      this.selectedEleves.push(eleveAdded);
    }
  }

  addProfesseurToSelected(selectedProfesseur) {
    let doublon = false;

    this.selectedProfesseurs.forEach(professeur => {
      if(professeur.idUtilisateur === selectedProfesseur.idUtilisateur){
        console.log("prof present");
        doublon = true;
      }
    })
    if(!doublon){
      this.selectedProfesseurs.push(selectedProfesseur); 
      console.log(selectedProfesseur); 
    }
  }

  addSalleToSelected(value){

    this.allSalleEtb.forEach((salle) => {
      if(value == salle.idSalle){
        console.log("found Id : " + value);
        this.selectedSallePut = salle;
      }
    });

  }


  majTitre() { this.titre = "Création du créneau du " + this.date_creneau.toString(); }

  onSend() {
    this.courseservice.createSlot(
      moment(this.date_creneau + " " + this.heure_debut).unix(),
      moment(this.date_creneau + " " + this.heure_fin).unix(),
      this.selectedEleves,
      this.selectedProfesseurs,
      this.selectedSallePut,
      this.idEtablissement);
  }

  onEdit(){
    console.log("edit !");
    this.courseservice.prepareEditedTimeSlot(
      this.idCreneau,
      moment(this.date_creneau + " " + this.heure_debut).unix(),
      moment(this.date_creneau + " " + this.heure_fin).unix(),
      this.selectedEleves,
      this.selectedProfesseurs,
      this.selectedSallePut,
      this.idEtablissement);
  }

  onCancel(){
    this.date_creneau = undefined;
    this.heure_debut = undefined;
    this.heure_fin = undefined;
    this.selectedProfesseurs = undefined;
    this.selectedEleves = undefined;
    this.allSalleEtb = undefined;
  }

  onChangeNom(optionDuMenu) { this.filterParNom = optionDuMenu; }

  displayFn(user: User): string {
    return user ? user.nom + " " + user.prenom : user.nom + " " + user.prenom;
  }

  enleverEleve(eleve: User) {
    const index: number = this.selectedEleves.indexOf(eleve);
    if (index !== -1) {
      this.selectedEleves.splice(index, 1);
    }
  }

  enleverProfesseur(professeur: User) {
    const index: number = this.selectedProfesseurs.indexOf(professeur);
    if(index !== -1){
      this.selectedProfesseurs.splice(index, 1);
    }
  }

  public getSlot(){
    this.creneauService.getSlot(this.idEtablissement, this.idCreneau)
      .subscribe((data: CourseSlot) => {
        this.editedCreneau = data;
        this.creneauId = data.idCreneau;
        this.editedCreneau.professeurs = data.professeurs;
        this.date_creneau = moment.unix(this.editedCreneau.dateDebut).format("YYYY-MM-DD");
        this.heure_debut =  moment.unix(this.editedCreneau.dateDebut).format("HH:mm");
        this.heure_fin =  moment.unix(this.editedCreneau.dateFin).format("HH:mm");
        this.selectedSallePut = this.editedCreneau.salle;
        this.selectedProfesseurs = this.editedCreneau.professeurs;
        this.selectedEleves = this.editedCreneau.eleves;
      });
  }

  // https://stackoverflow.com/questions/48984905/mat-slide-toggle-change-all-value-on-all-products-and-value-are-diffrent
  public onSlideChange(value){
    if (value.checked === true) { // Eleve absent
      console.log(1);
      console.log(value.nom)
    } else {
      console.log(0); //0
    }
  }

  public onActiveHomeboxP(value){
    console.log(value);
    console.log(value.present);
  }

  /* TODO :
    Utiliser bouton eleve présent :
      Ajouter propriété "present" à utilisateur
      activer méthode vérif sur liste d'élèves récupérés du back si présent :
        sinon ajout
    Adapter le titre en français
    
    En édition : bouton annuler = réinitialiser valeurs reçues.
    Changer de page si POST ou PUT successful
  */

}