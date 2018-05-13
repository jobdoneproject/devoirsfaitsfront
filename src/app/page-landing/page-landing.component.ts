import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-page-landing',
  templateUrl: './page-landing.component.html',
  styleUrls: ['./page-landing.component.css'],

})



export class PageLandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Background picture abstract blue
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(../../assets/pics/Abstract-Blue-Wallpapers.jpg)';
  }

}
