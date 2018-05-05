import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Router, RouterOutlet } from "@angular/router";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path : 'calendar', component: CalendarComponent },
  { path: '', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
