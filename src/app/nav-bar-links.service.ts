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
      href: '#',
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
      href: '#',
      title: 'Calendrier',
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
      href: '#',
      title: 'Calendrier',
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
      href: '#',
      title: 'Calendrier',
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
      firstName: '',
      lastName: '',
      email: '',
      admin: false,
      prof: false,
      role: ''
    };
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }

  getLinks() {

    if (this.currentUser === null) {
      return this.notLoggedLinks;
    } else if (this.currentUser.role === 'eleve') {
      return this.studentLinks;
    } else if (this.currentUser.role === 'prof') {
      return this.profLinks;
    } else if (this.currentUser.role === 'admin') {
      return this.adminLinks;
    } else {
      return this.notLoggedLinks;
    }
  }
}
