import { User } from "./model.user";

export class CourseSlot {
    date: Date;
    // heure debut - heure fin
    duration: Date;
    teachers: User[];
    students: User[];
    roomNumber: Number;

    constructor(
        date: Date,
        duration: Date,
        teachers: User[],
        students: User[],
        roomNumber: Number,
    ) {
        this.date = date;
        this.duration = duration;
        this.teachers = teachers;
        this.students = students
        this.roomNumber = roomNumber;
    }
}