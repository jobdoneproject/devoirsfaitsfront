import { Component, OnInit, Input } from '@angular/core';
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
  administrateur: boolean;

  constructor(private userService: UserService, private creneauService: CreneauService, private router: Router) {
    this.currentUser = this.userService.getCurrentUserLogged();
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);

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
    for (let currentTeacher of this.slotValue.profs){
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

  deleteSlot(slotId: number) {
    this.creneauService.deleteSelected(this.currentUser.idEtablissement, slotId);
    this.router.navigate(['profile'])
  }
}
