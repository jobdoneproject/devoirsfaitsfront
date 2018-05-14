import { Component, OnInit } from '@angular/core';
import { NavBarLinksService } from '../nav-bar-links.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBarLinks;

  constructor(private navBarLinksService: NavBarLinksService) { }

  ngOnInit() {
    this.navBarLinks = this.navBarLinksService.getLinks();
  }


}
