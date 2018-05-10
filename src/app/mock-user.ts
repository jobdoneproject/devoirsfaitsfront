import { User } from './user';

export const USERS: User[] = [
  {id: 11, firstName: 'Mr. Admin', lastName: 'Bean', email: 'adress@go.com', admin: true, prof: false },
  {id: 12, firstName: 'Mr. Prof', lastName: 'Bean', email: 'adress@go.com', admin: false, prof: true },
  {id: 13, firstName: 'Mr. Student', lastName: 'Bean', email: 'adress@go.com', admin: false, prof: false },
];
