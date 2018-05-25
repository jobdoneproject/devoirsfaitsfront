import { WeekDay } from "../model/model.week-day";

export class WeekUtils {
    /*
    Credits to https://weeknumber.net/how-to/javascript
    => [1, 53]
  */
  static getWeekNumberForDate(date: Date): number {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 0.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  static findMondayForWeekContainingDay(day: Date): Date {
    let dayClone = WeekUtils.cloneDay(day);
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

  // Inspiration : https://stackoverflow.com/a/26682843/662618
  static mondayForWeekNumber(weeknumber: number, year: number): Date {
    let monday = new Date(year, 0, (1 + (weeknumber - 1) * 7));
    while (monday.getDay() !== 1) {
        monday.setDate(monday.getDate() + 1);
    }
    return monday;
  }

  static getDateWithDaysOffset(day: Date, daysOffset: number) : Date {
      let dayClone = WeekUtils.cloneDay(day);
      dayClone.setDate(dayClone.getDate() + daysOffset);
      return dayClone;
  }

  static cloneDay(day: Date): Date {
      return new Date(day.getTime());
  }

  static dayOfWeekDay(weekDay: WeekDay): number{
    let dayOffset;
    switch(weekDay){
      case WeekDay.Lundi : dayOffset = 0; break;
      case WeekDay.Mardi : dayOffset = 1; break;
      case WeekDay.Mercredi : dayOffset = 2; break;
      case WeekDay.Jeudi : dayOffset = 3; break;
      case WeekDay.Vendredi : dayOffset = 4; break;
      case WeekDay.Samedi : dayOffset = 5; break;
      case WeekDay.Dimanche : dayOffset = 6; break;
    }
    return dayOffset;
  }

}