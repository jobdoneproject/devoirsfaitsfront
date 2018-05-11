import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageLandingComponent } from './page-landing/page-landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageInscripAdminComponent } from './page-inscrip-admin/page-inscrip-admin.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { Navbar2Component } from './navbar2/navbar2.component';

const routes: Routes = [
  { path: 'landing-page', component: PageLandingComponent },
  { path: 'inscription-ecole', component: PageInscripAdminComponent },
  { path: 'home', component: PageHomeComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PageLandingComponent,
    NavbarComponent,
    PageInscripAdminComponent,
    PageHomeComponent,
    Navbar2Component
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
