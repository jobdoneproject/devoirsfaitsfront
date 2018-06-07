import { User } from "./model.user";
import { Room } from "./model.room";

export class CourseSlot {
    id: number;
    dateDebut: number;
    dateFin: number;
    professeurs: User[];
    eleves: User[];
    salle: Room;
}