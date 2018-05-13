import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-inscrip-admin',
  templateUrl: './page-inscrip-admin.component.html',
  styleUrls: ['./page-inscrip-admin.component.css']
})
export class PageInscripAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Background picture abstract blue
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(../../assets/pics/Abstract-Blue-Wallpapers.jpg)';
  }

}
