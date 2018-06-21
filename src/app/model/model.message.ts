import { User } from "./model.user";

export class Message {
    idMessage: number;
    contenu: String;
    dateMessage: number;
    //redacteur: User;
    utilisateur: User;
    eleve: User;
}