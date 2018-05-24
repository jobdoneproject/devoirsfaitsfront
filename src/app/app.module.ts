import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "./services/auth.service";
import { HttpModule} from "@angular/http";
import { AccountService} from "./services/account.service";
import { routing} from "./app.routing";
import { UrlPermission} from "./urlPermission/url.permission";
import { UserService} from "./services/user.service";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { ElevesComponent} from "./components/listes/eleves/eleves.component";
import { PageLandingComponent } from './components/page-landing/page-landing.component';
import { PageUserEditComponent } from './components/page-user-edit/page-user-edit.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerFooterComponent } from './components/container-footer/container-footer.component';
import { ContainerNavbarComponent } from './components/container-navbar/container-navbar.component';
import { ContainerSidebarComponent } from './components/container-sidebar/container-sidebar.component';
import {MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ElevesDisponiblesPipe } from './pipes/eleves-disponibles.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    ElevesComponent,
    PageLandingComponent,
    PageUserEditComponent,
    ContainerComponent,
    ContainerFooterComponent,
    ContainerNavbarComponent,
    ContainerSidebarComponent,
    ElevesDisponiblesPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    HttpClientModule,
    MatListModule, 
    MatIconModule
  ],
  providers: [
    AuthService,
    AccountService,
    UrlPermission,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }