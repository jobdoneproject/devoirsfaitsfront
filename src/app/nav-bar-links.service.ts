import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class NavBarLinksService {

  notLoggedLinks = [
    {
      href: '/landing-page',
      title: 'Devoirs faits',
      icon: 'fas fa-camera-retro'
    },
    {
      href: '/inscription-ecole',
      title: 'Inscription',
      icon: ''
    },
    {
      href: '/login',
      title: 'Login',
      icon: ''
    }
  ];
  adminLinks = [
    {
      href: '/home',
      title: 'Home',
      icon: ''
    },
    {
      href: '/login',
      title: 'login',
      icon: ''
    },
    {
      href: '#',
      title: 'Eleves',
      icon: ''
    },
    {
      href: '#',
      title: 'Profs',
      icon: ''
    },
    {
      href: '#',
      title: 'Profil',
      icon: 'fas fa-users'
    },
  ];

  profLinks = [
    {
      href: '/home',
      title: 'Home',
      icon: ''
    },
    {
      href: '/login',
      title: 'login',
      icon: ''
    },
    {
      href: '#',
      title: 'Appel',
      icon: ''
    },
    {
      href: '#',
      title: 'Profil',
      icon: 'fas fa-chalkboard-teacher'
    }
  ];

  studentLinks = [
    {
      href: '/home',
      title: 'Home',
      icon: ''
    },
    {
      href: '/login',
      title: 'login',
      icon: ''
    },
    {
      href: '#',
      title: 'Timeline',
      icon: ''
    },
    {
      href: '#',
      title: 'Profil',
      icon: 'fas fa-user-graduate'
    },
  ];

  currentUser: User;

  constructor(
    private userService: UserService
  ) {
    this.currentUser = {
      id: -1,
      nom: '',
      prenom: '',
      mail: '',
      tel: '',
      privilege: '',
      disponible: false,
      password: ''
    };
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }

  getLinks() {

    if (this.currentUser === null) {
      return this.notLoggedLinks;
    } else if (this.currentUser.privilege === 'eleve') {
      return this.studentLinks;
    } else if (this.currentUser.privilege === 'prof') {
      return this.profLinks;
    } else if (this.currentUser.privilege === 'admin') {
      return this.adminLinks;
    } else {
      return this.notLoggedLinks;
    }
  }
}
