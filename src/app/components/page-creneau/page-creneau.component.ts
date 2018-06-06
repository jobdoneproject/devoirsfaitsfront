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
  @Input() date_creneau: Date;
  @Input() heure_debut: Time;
  @Input() heure_fin: Time;
  nomDisponibles = [];
  filterParNom: String;
  titre: String = "Création d'un créneau";
  myControl: FormControl = new FormControl();
  filteredEleve: Observable<any[]>;
  // salleSelected: Room;
  allSalleEtb: Observable<any>;
  idEtablissement: number;
  selectedSalle: Room;

  constructor(private roomsv: RoomService, private courseservice: CreneauService, public authService: AuthService, public router: Router, private userService:UserService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);

    this.idEtablissement = this.currentUser.idEtablissement;

    if (this.currentUser.privilege == "Administrateur") {
      this.administrateur = true;
    }

    this.listProfesseur = this.userService.getUsers("professeur", this.currentUser.idEtablissement);
    this.listEleve =  this.userService.getUsers("eleve", this.currentUser.idEtablissement);
    this.allSalleEtb = this.roomsv.getAll(this.currentUser.idEtablissement);

    this.listEleve.forEach(arrayNomUtilisateur => {
      arrayNomUtilisateur.forEach(utilisateur => {
        if (this.nomDisponibles.indexOf(utilisateur.nom) == -1) {
          this.nomDisponibles.push(utilisateur.nom);
        }
      })
    });
  }

  addEleveToSelected() { 
    let eleveAdded = this.myControl.value;
    // If eleveAdded ! contains present, ajout avec true
    if(!eleveAdded.hasOwnProperty('present')){
      eleveAdded.present = true;
      console.log("ne contient pas present");
    }else{
      console.log("le contient");
    }
    this.selectedEleves.push(eleveAdded); 
  }

  addProfesseurToSelected(selectedProfesseur) { this.selectedProfesseurs.push(selectedProfesseur); console.log(selectedProfesseur); }

  addSalleToSelected(salle){ 
    this.selectedSalle = salle;
    console.log("salle added"); 
    console.log(salle);
  }

  majTitre() { this.titre = "Création du créneau du " + this.date_creneau.toString(); }

  onSend() {
    this.courseservice.createSlot(moment(this.date_creneau + " " + this.heure_debut).unix(),
                                  moment(this.date_creneau + " " + this.heure_fin).unix(),
                                  this.selectedEleves,
                                  this.selectedProfesseurs,
                                  this.selectedSalle,
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

  ngOnInit() {
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


}