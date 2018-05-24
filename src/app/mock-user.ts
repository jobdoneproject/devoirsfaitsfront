import { User } from './model/model.user';


export const USERS: User[] = [
  {
    id: 11, 
    prenom: 'Dupont', 
    nom: 'Alexis', 
    classe: null, 
    password: '@12*!Pass',
    mail: 'adresse@go.com', 
    telephone: '06.12.13.45.78', 
    privilege: 'admin',
    actif: true, 
    disponible: true, 
    idEtablissement: 1,
    ville: 'Bidart',
    etablissement: 'WCS'
  },
  {
    id: 12, 
    prenom: 'Rudolf', 
    nom: 'Steiner', 
    classe: null, 
    password: '@12*!Pass',
    mail: 'adresse@go.com', 
    telephone: '06.12.13.45.78', 
    privilege: 'prof',
    actif: true, 
    disponible: true, 
    idEtablissement: 1,
    ville: 'Bidart',
    etablissement: 'WCS'
  },
  {
    id: 13, 
    prenom: 'Titeuf', 
    nom: 'Lacavalle', 
    classe: '3F', 
    password: '@12*!Pass',
    mail: 'adresse@go.com', 
    telephone: '06.12.13.45.78', 
    privilege: 'eleve',
    actif: true, 
    disponible: true, 
    idEtablissement: 1,
    ville: 'Bidart',
    etablissement: 'WCS'
  },
];
