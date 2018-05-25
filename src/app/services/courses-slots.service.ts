import { Injectable } from '@angular/core';
import { CourseSlot } from '../model/model.course-slots';
import { User } from "../model/model.user";
import { DESTRUCTION } from 'dns';

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

  generateRandomDate() : Date{
    const now = new Date();
    const currentWeekNumber = CourseSlotsService.getWeekNumber(now);
    const mondayOfCurrentWeek = CourseSlotsService.findMondayForWeekOfDay(now);

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const maxDaysForCurrentMonth = CourseSlotsService.daysInMonth(currentMonth - 1, currentYear);
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
    
    const maxTeachersCount = 7;
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
    const matchingWeekNumber: Number = CourseSlotsService.getWeekNumber(date);
    return this.getSlotsForWeekNumber(matchingWeekNumber);
  }

  /*
    Credits to https://weeknumber.net/how-to/javascript
    => [1, 53]
  */
  static getWeekNumber(date: Date): Number {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 0.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  static findMondayForWeekOfDay(day: Date): Date {
    let dayClone = new Date(day.getUTCDate());
    dayClone.setDate(dayClone.getDate() - (dayClone.getDay() + 6) % 7);
    return dayClone;
  }

  // Credits to https://stackoverflow.com/a/1184359/662618
  // Month here is 1-indexed (January is 1, February is 2, etc). This is
  // because we're using 0 as the day so that it returns the last day
  // of the last month, so you have to add 1 to the month number 
  // so it returns the correct amount of days
  static daysInMonth (month, year) : number {
    return new Date(year, month, 0).getDate();
  }
}
