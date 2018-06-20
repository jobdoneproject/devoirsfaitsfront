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
import { identifierModuleUrl } from '@angular/compiler';


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
  selectedSalleId:number;
  @Input() newName: string;
  allSalles: Room[];
  doublonInfo: string;



  constructor(private roomsv: RoomService, public authService: AuthService, public router: Router, private userService:UserService) {

    this.currentUser = this.userService.getCurrentUserLogged();
    if (this.currentUser.privilege == "Administrateur") {
      this.administrateur = true;
      }
      if (this.currentUser.privilege != "Administrateur") {
      this.router.navigate(['/profile']);
      }

    

    // this.allSalleEtb = this.roomsv.getAll(this.currentUser.idEtablissement);

    // this.allSalleEtb.forEach(arrayNomUtilisateur => {
    //   arrayNomUtilisateur.forEach(salle => {
    //     if (this.nomDisponibles.indexOf(salle.nom) == -1) {
    //       this.nomDisponibles.push(salle.nom);
    //     }
    //   })
    // });
    
    this.updateList();

    


    
  }

  ngOnInit() {
  }

  updateList(){
    this.roomsv.getAll(this.currentUser.idEtablissement).subscribe(
      (data: Room[]) => {
        this.allSalles = data;
      }
    );
  }

  onChangeNom(optionDuMenu) { this.filterParNom = optionDuMenu; }

  createSalle(nom:String) {
    // console.log(this.allSalles.length)
    // let doublon = false;
    // for (let i = 0; i < this.allSalles.length; i++){
      // this.allSalles.forEach(salle => {
      //   if(salle.nom === nom){
      //     doublon = true;
      //     // console.log('DOUBLON');
      //     this.doublonInfo = "Salle '" + nom + "' déjà enregistrée.";
      //   }
      // });
    // }
    if(!this.checkDoublon(nom)){
      this.roomsv.createNew(this.currentUser.idEtablissement, nom)
      .subscribe(data =>{
        // console.log("data");
        // console.log(data);
        this.updateList();
        (<HTMLInputElement>document.getElementById("nom_salle")).value = "";
      });
    }
  }

  checkDoublon(nom: String){
    let doublon = false;
    // for (let i = 0; i < this.allSalles.length; i++){
      this.allSalles.forEach(salle => {
        if(salle.nom === nom){
          doublon = true;
          // console.log('DOUBLON');
          this.doublonInfo = "Salle '" + nom + "' déjà enregistrée.";
          // setTimeout( 5000 );
          // this.doublonInfo = "";
          $('#doublonInfo').delay(0).show(500).delay(3000).hide(500);
        }
      });
    return doublon;
  }

  deleteSalle (salle: Room) {
    this.roomsv.deleteSelected(this.currentUser.idEtablissement,salle.idSalle)
    .subscribe(data => {
      // console.log(data);
      this.updateList();
      // Clear select option :
      // (<HTMLInputElement>document.getElementById("choisirSalle")).value = "";
    });
  }

  displayFn(salle: Room): String {
    if (salle) {
    return salle ? salle.nom : salle.nom ;
    }
  }

  onSelectionChanged(salle) {
    console.log(salle);
    this.selectedSalle = salle;
  }

  onSelectionChangedById(id) {
    console.log(id);
    for (let i = 0 ; i < this.allSalles.length; i++){
      if(this.allSalles[i].idSalle == id){
        this.selectedSalle = this.allSalles[i];
      }
    }
    // this.selectedSalle = salle;
  }

  updateSalle(salle) {
    this.roomsv
    // .updateSelected(this.currentUser.idEtablissement, salle.idSalle, this.newName)
    .updateSelected2(this.currentUser.idEtablissement, salle.idSalle, this.newName)
    .subscribe(date => {
      this.updateList();
      // (<HTMLInputElement>document.getElementById("choisirSalle")).value = this.newName;
      // (<HTMLInputElement>document.getElementById("newName")).value = "";
    });
  }

  edit(id) {
    // console.log(id);
    this.selectedSalleId = id;
    for (let i = 0 ; i < this.allSalles.length; i++){
      if(this.allSalles[i].idSalle == id){
        this.selectedSalle = this.allSalles[i];
        this.newName = String(this.allSalles[i].nom);
      }
    }
    $('html,body').scrollTop(0);
  }

}
