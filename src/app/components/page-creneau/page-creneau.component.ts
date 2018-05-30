import { Component, OnInit, ViewEncapsulation, IterableDiffers, Input, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from "../../model/model.user";
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { AuthService } from "../../services/auth.service";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Time } from '@angular/common';
import * as moment from 'moment';
import { CourseSlot } from "../../model/model.courseslot";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page-creneau',
  templateUrl: './page-creneau.component.html',
  styleUrls: ['./page-creneau.component.scss']
})
export class PageCreneauComponent implements OnInit {

  newCreneau: CourseSlot = { id: null, dateDebut: 0, dateFin: 0, profs: [], eleves: [], salle: null };
  selectedEleves: User[] = [];
  selectedProfesseurs: User[] = [];
  currentUser: User;
  administrateur: boolean;
  errorMessage: string;
  idEtablissement: number;
  url: string;
  listEleve: Observable<any>;
  listProfesseur: Observable<any>;
  eleve: User;
  @Input() date_creneau: Date;
  @Input() heure_debut: Time;
  @Input() heure_fin: Time;
  timestamp: any;
  nomDisponibles = [];
  filterParNom: String;
  titre: String = "Création d'un créneau";
  myControl: FormControl = new FormControl();
  filteredEleve: Observable<any[]>;

  constructor(public authService: AuthService, public router: Router, private http: Http) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;

    console.log("this.currentUser.privilege : " + this.currentUser.privilege);

    if (this.currentUser.privilege == "Administrateur") {
      this.administrateur = true;
    }

    this.url = environment.API_URL + "/professeur/etablissement/" + this.currentUser.idEtablissement;
    this.listProfesseur = this.http.get(this.url).pipe(map((resp: Response) => resp.json()));
    this.url = environment.API_URL + "/eleve/etablissement/" + this.currentUser.idEtablissement;
    this.listEleve = this.http.get(this.url).pipe(map((resp: Response) => resp.json()));

    this.listEleve.forEach(arrayNomUtilisateur => {
      arrayNomUtilisateur.forEach(utilisateur => {
        if (this.nomDisponibles.indexOf(utilisateur.nom) == -1) {
          this.nomDisponibles.push(utilisateur.nom);
        }
      })
    });
  }

  addEleveToSelected() { this.selectedEleves.push(this.myControl.value); }

  addProfesseurToSelected(selectedProfesseur) { this.selectedProfesseurs.push(selectedProfesseur); }

  majTitre() { this.titre = "Création du créneau du " + this.date_creneau.toString(); }

  onSend() {
    this.newCreneau.dateDebut = moment(this.date_creneau + " " + this.heure_debut).unix();
    this.newCreneau.dateFin = moment(this.date_creneau + " " + this.heure_fin).unix();
    this.newCreneau.eleves = this.selectedEleves;
    this.newCreneau.profs = this.selectedProfesseurs;
    this.newCreneau.salle = "20A";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.newCreneau);
    console.log(body);
    //this.http.post('/api/etablissement/'+this.currentUser.idEtablissement+'/creneaux/', body, options ).map((res: Response) => res.json());
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
}
