import { User } from "./model.user";

export class CourseSlot {
    id: number;
    dateDebut: number;
    dateFin: number;
    profs: User[];
    eleves: User[];
    salle: String;
}