import { User } from "./model.user";

export class Message {
    idMessage: number;
    contenu: String;
    date: number;
    redacteur: User;
    eleve: User;
}