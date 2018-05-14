import { User } from './user';

export const USERS: User[] = [
  {id: 11, nom: 'Mr. Admin', prenom: 'Bean', password: '1234',
  mail: 'adress@go.com', tel: '06.12.13.45.78', privilege: 'administrateur', disponible: true },
  {id: 12, nom: 'Mr. Prof', prenom: 'Bean', password: '1234',
  mail: 'adress@go.com', tel: '06.12.13.45.78', privilege: 'professeur', disponible: true },
  {id: 13, nom: 'Mr. Student', prenom: 'Bean', password: '1234',
  mail: 'adress@go.com', tel: '06.12.13.45.78', privilege: 'eleve', disponible: true },
];
