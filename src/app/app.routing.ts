import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UrlPermission} from "./urlPermission/url.permission";
import {ListeUtilisateurComponent} from "./components/liste-utilisateur/liste-utilisateur.component"
import { PageLandingComponent } from './components/page-landing/page-landing.component';
import { PageUserEditComponent } from './components/page-user-edit/page-user-edit.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerFooterComponent } from './components/container-footer/container-footer.component';
import { ContainerNavbarComponent } from './components/container-navbar/container-navbar.component';
import { ContainerSidebarComponent } from './components/container-sidebar/container-sidebar.component';

const appRoutes: Routes = [
  { path: 'bienvenue', component: PageLandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'liste/:type', 
    component: ContainerComponent ,canActivate: [UrlPermission],
    children: [{path: '', component: ListeUtilisateurComponent, outlet: 'connected'}]
  },

  { path: 'profile',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{path: '', component: ProfileComponent, outlet: 'connected'}]
  },


  { path: 'edition-utilisateur/:type/:id',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{path: '', component: PageUserEditComponent, outlet: 'connected'}]
  },

  { path: '', redirectTo: 'bienvenue', pathMatch: 'full' },

  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
