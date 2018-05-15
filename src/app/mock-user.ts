import { User } from './user';

export const USERS: User[] = [
  {id: 11, prenom: 'Dupont', nom: 'Alexis', classe: null, password: '@12*!Pass',
  mail: 'adress@go.com', telephone: '06.12.13.45.78', privilege: 'admin',
  actif: true, disponible: true, idEtablissement: 1 },
  {id: 12, prenom: 'Durant', nom: 'Sophie', classe: null, password: '@12*!Pass',
  mail: 'adress@go.com', telephone: '06.12.13.45.78', privilege: 'prof',
  actif: true, disponible: true, idEtablissement: 1 },
  {id: 13, prenom: 'Titeuf', nom: 'Lacavalle', classe: '3D', password: '@12*!Pass',
  mail: 'adress@go.com', telephone: '06.12.13.45.78', privilege: 'eleve',
  actif: true, disponible: true, idEtablissement: 1 },
];
