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
import { RoomService } from "../../services/room.service";
import { Room } from '../../model/model.room';


@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit {

  currentUser: User;
  administrateur: boolean;
  errorMessage: string;
  allSalleEtb: Observable<any>;
  @Input() nom_salle: String;
  nomDisponibles = [];
  filterParNom: String;
  myControl: FormControl = new FormControl();
  selectedSalle: any;
  @Input() newName: string;



  constructor(private roomsv: RoomService, public authService: AuthService, public router: Router, private userService:UserService) {

    this.currentUser = this.userService.getCurrentUserLogged();

    if (this.currentUser.privilege == "Administrateur") {
      this.administrateur = true;
    }

    this.allSalleEtb = this.roomsv.getAll(this.currentUser.idEtablissement);

  this.allSalleEtb.forEach(arrayNomUtilisateur => {
      arrayNomUtilisateur.forEach(salle => {
        if (this.nomDisponibles.indexOf(salle.nom) == -1) {
          this.nomDisponibles.push(salle.nom);
        }
      })
    });
  }

  ngOnInit() {
  }

  onChangeNom(optionDuMenu) { this.filterParNom = optionDuMenu; }

  createSalle(nom:String) {
    this.roomsv.createNew(this.currentUser.idEtablissement, nom);
  }

  deleteSalle (salle: Room) {
    this.roomsv.deleteSelected(this.currentUser.idEtablissement,salle.idSalle);
  }

  displayFn(salle: Room): String {
    return salle ? salle.nom : salle.nom ;
  }

  onSelectionChanged(salle) {
    this.selectedSalle = salle;
  }

  updateSalle(salle) {
    this.roomsv.updateSelected(this.currentUser.idEtablissement, salle.idSalle, this.newName)
  }
}
