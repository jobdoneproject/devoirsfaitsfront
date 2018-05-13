import { User } from './user';

export const USERS: User[] = [
  {id: 11, firstName: 'Jacques', lastName: 'Durant', classe: '',
  email: 'adress@go.com', tel: '06.12.13.45.78', admin: true, prof: false, role: 'admin', disponible: true,
  idEtablissement: 1, password: '&@àù*12WilD' },
  {id: 12, firstName: 'François', lastName: 'Bean', classe: '',
  email: 'adress@go.com', tel: '06.12.13.45.78', admin: false, prof: true, role: 'prof', disponible: true,
  idEtablissement: 1, password: '&@àù*12WilD' },
  {id: 13, firstName: 'Adrien', lastName: 'Bean', classe: '3A',
  email: 'adress@go.com', tel: '06.12.13.45.78', admin: false, prof: false, role: 'eleve', disponible: true,
  idEtablissement: 1, password: '&@àù*12WilD' },
];
