import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageLandingComponent } from './components/page-landing/page-landing.component';
import { PageInscripAdminComponent } from './components/page-inscrip-admin/page-inscrip-admin.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageUserEditComponent } from './components/page-user-edit/page-user-edit.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerFooterComponent } from './components/container-footer/container-footer.component';
import { ContainerNavbarComponent } from './components/container-navbar/container-navbar.component';
import { ContainerSidebarComponent } from './components/container-sidebar/container-sidebar.component';
import { PageLoginComponent } from './components/page-login/page-login.component';


const routes: Routes = [
  { path: 'landing-page', component: PageLandingComponent },
  { path: 'inscription-ecole', component: PageInscripAdminComponent },
  { path: 'login', component: PageLoginComponent },
  // { path: 'home', component: PageHomeComponent },
  { path: 'home',
    component: ContainerComponent,
    children: [{path: '', component: PageHomeComponent, outlet: 'connected'}]
  },
  { path: 'edition-utilisateur/:id',
    component: ContainerComponent,
    children: [{path: '', component: PageUserEditComponent, outlet: 'connected'}]
  },
  // { path: 'edition-utilisateur/:id', component: PageUserEditComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PageLandingComponent,
    PageInscripAdminComponent,
    PageHomeComponent,
    PageUserEditComponent,
    PageLoginComponent,
    ContainerComponent,
    ContainerFooterComponent,
    ContainerNavbarComponent,
    ContainerSidebarComponent
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
