import { Injectable } from '@angular/core';
import { CourseSlot } from '../model/model.course-slots';
import { User } from "../model/model.user"; 
import { WeekDay } from '../model/model.week-day';
import { WeekUtils } from '../utils/WeekUtils';

@Injectable({
  providedIn: 'root'
})
export class CourseSlotsService {

  constructor() { }

  getAllSlots(): CourseSlot [] {
    let arrayToReturn = [];
    const maxValuesNumber = 10;
    const valuesNumber = Math.floor(Math.random() * maxValuesNumber);


    for (let i = 0; i < valuesNumber; i++){
      const currentSlot = new CourseSlot
      (
        this.generateRandomDate(),
        this.generateRandomDuration(),
        this.generateRandomTeachersArray(0),
        this.generateRandomStudentsArray(100),
        this.generateRandomRoomNumber()
      );

      arrayToReturn.push(currentSlot);
    }

    return arrayToReturn;
  }

  static filterSlotsKeepingThoseMatchingWeekDay(weekDay: WeekDay, inputSlots: CourseSlot[]) : CourseSlot[] {
    let arrayToReturn : CourseSlot[] =  [];

    for (let currentSlot of inputSlots){
      //if (currentSlot.date.getDay)
    }

    return arrayToReturn;
  }

  generateRandomDate() : Date{
    const now = new Date();
    const currentWeekNumber = WeekUtils.getWeekNumberForDate(now);
    const mondayOfCurrentWeek = WeekUtils.findMondayForWeekContainingDay(now);

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const maxDaysForCurrentMonth = WeekUtils.daysInMonth(currentMonth - 1, currentYear);
    const currentDay = Math.floor(Math.random() * maxDaysForCurrentMonth) + 1;

    const currentHour = Math.floor(Math.random() * 24);
    const currentMinutes = Math.floor(Math.random() * 60);
    const currentSeconds = 0;
    const currentMilliseconds = 0;

    return new Date(currentYear, currentMonth, currentDay, currentHour, currentMinutes, currentSeconds, currentMilliseconds);
  }

  generateRandomDuration() : Date {
    const currentDurationHour = Math.floor(Math.random() * 24);
    const currentDurationMinutes = Math.floor(Math.random() * 60);

    return new Date(0, 0, 0, currentDurationHour, currentDurationMinutes, 0, 0);
  }

  generateRandomTeachersArray(startId: number) : User[] {
    let arrayToReturn : User[] = [];
    
    const maxTeachersCount = 2;
    const teachersCount = Math.floor(Math.random() * maxTeachersCount);

    arrayToReturn.push(
      this.generateTeacher(startId)
    );

    let id = startId + 1;
    for (let i = 0; i < teachersCount; i++){
      

     arrayToReturn.push(
       this.generateTeacher(id)
     );
     id++;
    }

    return arrayToReturn;
  }

  generateRandomStudentsArray(startId: number) : User[] {
    let arrayToReturn : User[] = [];
    
    const maxUsersCount = 7;
    const usersCount = Math.floor(Math.random() * maxUsersCount);

    let id = startId;
    for (let i = 0; i < usersCount; i++){
      

     arrayToReturn.push(
       this.generateStudent(id)
     );
     id++;
    }

    return arrayToReturn;
  }

  generateTeacher(id): User {
    const availableFirstNames = ['Tartempion', 'Dupont', 'Martin', 'Durant', 'MachinTruc'];
    const availableLastNames = ['Jean', 'Pierre', 'Paul', 'Jack', 'Jules'];
    const lettreClasseDisponibles = ['A', 'B', 'C', 'D', 'E', 'F'];

     const nomIndex = Math.floor(Math.random() * availableFirstNames.length);
     const prenomIndex = Math.floor(Math.random() * availableLastNames.length);
     const nom = availableFirstNames[nomIndex];
     const prenom = availableLastNames[prenomIndex];
     const mail = `${nom}.${prenom}@edu.org`;
     const password = '1234';
     const disponible = true;
     const actif = true;
     const numeroClasse = Math.floor(Math.random() * 4) + 3;
     const lettreClasse = lettreClasseDisponibles[Math.floor(Math.random() * lettreClasseDisponibles.length)];
     const classe = `${numeroClasse}${lettreClasse}`;
     const privilege = 'Professeur';
     const idEtablissement = 3;
     const etablissement = 'Marracq';
     const ville = 'Anglet';
     const telephone = '06 02 02 02 02';

    return {
      id, nom, prenom, mail, password, disponible, actif, classe,
       privilege, idEtablissement, telephone, ville, etablissement
    };
  }

  generateStudent(id) : User {
    const availableFirstNames = ['Tartempion', 'Dupont', 'Martin', 'Durant', 'MachinTruc'];
    const availableLastNames = ['Jean', 'Pierre', 'Paul', 'Jack', 'Jules'];
    const lettreClasseDisponibles = ['A', 'B', 'C', 'D', 'E', 'F'];

     const nomIndex = Math.floor(Math.random() * availableFirstNames.length);
     const prenomIndex = Math.floor(Math.random() * availableLastNames.length);
     const nom = availableFirstNames[nomIndex];
     const prenom = availableLastNames[prenomIndex];
     const mail = `${nom}.${prenom}@edu.org`;
     const password = '1234';
     const disponible = true;
     const actif = true;
     const numeroClasse = Math.floor(Math.random() * 4) + 3;
     const lettreClasse = lettreClasseDisponibles[Math.floor(Math.random() * lettreClasseDisponibles.length)];
     const classe = `${numeroClasse}${lettreClasse}`;
     const privilege = 'Eleve';
     const idEtablissement = 3;
     const etablissement = 'Marracq';
     const ville = 'Anglet';
     const telephone = '06 02 02 02 02';

    return {
      id, nom, prenom, mail, password, disponible, actif, classe,
       privilege, idEtablissement, telephone, ville, etablissement
    };
  }

  generateRandomRoomNumber() : number {
    return Math.floor(Math.random() * 500);
  }

  getSlotsForWeekNumber(weekNumber: Number) : CourseSlot [] {
    //TODO fetch and convert the slots from database
    //TODO : filter the slots
    return this.getAllSlots();
  }

  getSlotsForWeekIncludingDate(date: Date) : CourseSlot [] {
    const matchingWeekNumber: Number = WeekUtils.getWeekNumberForDate(date);
    return this.getSlotsForWeekNumber(matchingWeekNumber);
  }
}
