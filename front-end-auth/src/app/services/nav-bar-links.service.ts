import { Injectable } from '@angular/core';
import {User} from "../model/model.user";


export class NavBarLinksService {
  
  adminLinks = [
    {
      href: 'https://www.google.fr',
      title: "Google !"
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
      title: "Google !"
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
      title: "Google !"
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

  constructor() {}

  getLinks() {
    if (this.currentUser.privilege == 'Administrateur'){
      return this.adminLinks;
    }
    else if (this.currentUser.privilege == 'Professeur') {
      return this.profLinks;
    }
    else {
      return this.studentLinks;
    }
  }
}
