import { User } from "./model.user";
import { Room } from "./model.room";

export class CourseSlot {
    id: number;
    dateDebut: number;
    dateFin: number;
    profs: User[];
    eleves: User[];
    salle: Room;
}