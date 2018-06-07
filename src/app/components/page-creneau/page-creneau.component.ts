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
  titre: String = "Création d'un créneau";
  myControl: FormControl = new FormControl();
  filteredEleve: Observable<any[]>;
  // salleSelected: Room;
  allSalleEtb: Observable<any>;
  idEtablissement: number;
  selectedSalle: Room;
  idCreneau: number;
  // editedCreneau:Observable<any>;
  // editedCreneau:CourseSlot;
  editedCreneau:CourseSlot;
  // date_creneau: any;


  constructor(private roomsv: RoomService, 
              private courseservice: CreneauService, 
              public authService: AuthService, 
              public router: Router, 
              private userService:UserService,
              private route: ActivatedRoute,
              private creneauService: CreneauService) {


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
    let doublon = false;
    this.selectedEleves.forEach(eleve => {
      if(eleve.idUtilisateur === eleveAdded.idUtilisateur){
        console.log("eleve present");
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
    this.idCreneau = parseInt(this.route.snapshot.paramMap.get('id'),10);
    // this.editedCreneau = { id: null, dateDebut: 0, dateFin: 0, professeurs: [], eleves: [], salle: null };
    // this.editedCreneau = this.creneauService.getSlot(this.idEtablissement, this.idCreneau);
    // this.editedCreneau = this.getSlot();
    this.getSlot();
    // console.log(this.editedCreneau);

    // this.dateCreneau = moment.unix(this.editedCreneau.dateDebut).format("DD/MM/YYYY");

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

            this.editedCreneau.id = data.id;
            // this.editedCreneau.dateDebut = data.dateDebut;
            // this.editedCreneau.dateFin = data.dateFin;
            this.editedCreneau.salle = data.salle;
            this.editedCreneau.professeurs = data.professeurs;
            // this.editedCreneau.eleves = data.eleves;

            console.log(data);
            this.date_creneau = moment.unix(this.editedCreneau.dateDebut).format("YYYY-MM-DD");
            this.heure_debut =  moment.unix(this.editedCreneau.dateDebut).format("HH:mm");
            this.heure_fin =  moment.unix(this.editedCreneau.dateFin).format("HH:mm");
            this.selectedSalle = this.editedCreneau.salle;
            // this.salle = 
            this.selectedProfesseurs = this.editedCreneau.professeurs;
            this.selectedEleves = this.editedCreneau.eleves;

          });
  }
}