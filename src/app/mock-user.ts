import { User } from './user';

export const USERS: User[] = [
  {id: 11, firstName: 'Mr. Admin', lastName: 'Bean',
  email: 'adress@go.com', tel: '06.12.13.45.78', admin: true, prof: false, role: 'admin', disponible: true },
  {id: 12, firstName: 'Mr. Prof', lastName: 'Bean',
  email: 'adress@go.com', tel: '06.12.13.45.78', admin: false, prof: true, role: 'prof', disponible: true },
  {id: 13, firstName: 'Mr. Student', lastName: 'Bean',
  email: 'adress@go.com', tel: '06.12.13.45.78', admin: false, prof: false, role: 'eleve', disponible: true },
];
