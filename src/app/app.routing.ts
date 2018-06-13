import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { UrlPermission } from "./urlPermission/url.permission";
import { ListeUtilisateurComponent } from "./components/liste-utilisateur/liste-utilisateur.component"
import { PageLandingComponent } from './components/page-landing/page-landing.component';
import { PageUserEditComponent } from './components/page-user-edit/page-user-edit.component';
import { ContainerComponent } from './components/container/container.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { PageCreneauComponent } from './components/page-creneau/page-creneau.component';
import { SalleComponent } from './components/salle/salle.component';
import { ImportElevesComponent } from './components/import-eleves/import-eleves.component';
import { ImportProfesseursComponent } from './components/import-professeurs/import-professeurs.component';
import { ListeAppelComponent } from './components/liste-appel/liste-appel.component';

const appRoutes: Routes = [
  { path: 'bienvenue', component: PageLandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'liste/:type',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: ListeUtilisateurComponent, outlet: 'connected' }]
  },
  {
    path: 'profile',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: ProfileComponent, outlet: 'connected' }]
  },
  {
    path: 'datepicker',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: DatepickerComponent, outlet: 'connected' }]
  },
  {
    path: 'creneau',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: PageCreneauComponent, outlet: 'connected' }]
  },
  { path: 'creneau/:id',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{path: '', component: PageCreneauComponent, outlet: 'connected'}]
  },
  {
    path: 'salle',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: SalleComponent, outlet: 'connected' }]
  },
  {
    path: 'edition-utilisateur/:type/:id',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: PageUserEditComponent, outlet: 'connected' }]
  },
  { path: 'creation-utilisateur/:type',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{path: '', component: PageUserEditComponent, outlet: 'connected'}]
  },
  { path: 'import-eleves',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{path: '', component: ImportElevesComponent, outlet: 'connected'}]
  },
  { path: 'import-professeurs',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{path: '', component: ImportProfesseursComponent, outlet: 'connected'}]
  },
  {
    path: 'liste-appel/:id',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: ListeAppelComponent, outlet: 'connected' }]
  },

  { path: '', redirectTo: 'bienvenue', pathMatch: 'full' },

  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' });
