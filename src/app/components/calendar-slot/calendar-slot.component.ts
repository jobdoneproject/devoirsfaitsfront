import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { duration, utc } from 'moment';
import { CourseSlot } from '../../model/model.course-slots';
import { User } from '../../model/model.user';
import { CreneauService } from '../../services/creneau.service';
import {UserService} from "../../services/user.service";
import { Router } from '@angular/router';



@Component({
  selector: 'calendar-slot',
  templateUrl: './calendar-slot.component.html',
  styleUrls: ['./calendar-slot.component.scss']
})
export class CalendarSlotComponent implements OnInit {

  @Input() private slotValue: CourseSlot;
  currentUser: User;
  @Output() onDeleteEvent = new EventEmitter<any>();
  administrateur: boolean = false;
  deletedSlot: CourseSlot;

  constructor(private userService: UserService, private creneauService: CreneauService, private router: Router) {
    this.currentUser = this.userService.getCurrentUserLogged();

    if (this.currentUser.privilege == "Administrateur") {
      this.administrateur = true;
    }
   }

  ngOnInit() {
  }

  public get slot(): CourseSlot {
    return this.slotValue;
  }

  public get teachers() : String[] {
    let arrayToReturn: String[] = [];
    for (let currentTeacher of this.slotValue.professeurs){
      arrayToReturn.push(`${currentTeacher.nom} ${currentTeacher.prenom}`);
    }
    return arrayToReturn;
  }

  public get duration(): Date {
    const durationInstance = this.slotValue.dateFin - this.slotValue.dateDebut;
    let date = new Date(1970, 0, 1);
    date.setSeconds(durationInstance);
    return date;
  }

  public get salle(): String {
    if(this.slotValue.salle) {
      return this.slotValue.salle.nom;
    }
    return " non définie";
  }

  public get adresseCreneau(): String {
    let adresse: String;
    if (this.currentUser.privilege === "Administrateur"){
      adresse = `creneau/${this.slotValue.idCreneau}`;
    }
    else if (this.currentUser.privilege === "Professeur"){
      adresse = `liste-appel/${this.slotValue.idCreneau}`;
    }
    else adresse = undefined;
    return adresse;
  }

  allerSurPageCreneau() {
    if (this.currentUser.privilege === "Administrateur"
      || this.currentUser.privilege === "Professeur"){
        this.router.navigate([this.adresseCreneau]);
      }
  }

  deleteSlot(slotId: number) {
    let savedDeletedSlot:CourseSlot;
    this.creneauService.getSlot(this.currentUser.idEtablissement, slotId).subscribe((data: CourseSlot) => {
      savedDeletedSlot = data;
      this.onDeleteEvent.emit(savedDeletedSlot);
      this.creneauService.deleteSelected(this.currentUser.idEtablissement, slotId);
      
    });
  }

  goToChecklist(slotId: number) {
    this.router.navigate(['liste-appel/' + slotId]);
  }


}
