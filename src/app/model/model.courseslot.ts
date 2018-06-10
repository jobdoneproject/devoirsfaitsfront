import { User } from "./model.user";
import { Room } from "./model.room";

export class CourseSlot {
    idCreneau: number;
    dateDebut: number;
    dateFin: number;
    professeurs: User[];
    eleves: User[];
    salle: Room;
}