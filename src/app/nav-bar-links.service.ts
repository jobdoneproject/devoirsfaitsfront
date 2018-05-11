import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class NavBarLinksService {

  adminLinks = [
    {
      href: 'https://www.google.fr',
      title: 'Google !'
    },
    {
      href: 'https://duckduckgo.com/',
      title: 'Duck duck go !'
    },
    {
      href: 'https://www.yaronet.com/',
      title: 'Yaronet !'
    },
    {
      href: 'http://www.lycos.fr/',
      title: 'Lycos'
    },
    {
      href: 'https://outlook.live.com/owa/',
      title: 'Outlook'
    },
    {
      href: 'https://myadmin.hull.ac.uk/main/',
      title: 'MyAdminPage'
    }
  ];

  profLinks = [
    {
      href: 'https://www.google.fr',
      title: 'Google !'
    },
    {
      href: 'https://duckduckgo.com/',
      title: 'Duck duck go !'
    },
    {
      href: 'https://www.yaronet.com/',
      title: 'Yaronet !'
    },
    {
      href: 'http://www.lycos.fr/',
      title: 'Lycos'
    },
    {
      href: 'https://outlook.live.com/owa/',
      title: 'Outlook'
    }
  ];

  studentLinks = [
    {
      href: 'https://www.google.fr',
      title: 'Google !'
    },
    {
      href: 'https://duckduckgo.com/',
      title: 'Duck duck go !'
    },
    {
      href: 'https://www.yaronet.com/',
      title: 'Yaronet !'
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
      prof: false
    };
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }

  getLinks() {
    if (this.currentUser.admin) {
      return this.adminLinks;
    } else if (this.currentUser.prof) {
      return this.profLinks;
    } else {
      return this.studentLinks;
    }
  }
}
