import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UrlPermission} from "./urlPermission/url.permission";
import {ElevesComponent} from "./components/listes/eleves/eleves.component"
import { PageLandingComponent } from './components/page-landing/page-landing.component';

const appRoutes: Routes = [
  { path: 'bienvenue', component: PageLandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent ,canActivate: [UrlPermission] },
  { path: 'eleves', component: ElevesComponent ,canActivate: [UrlPermission] },
  { path: '', redirectTo: 'bienvenue', pathMatch: 'full' },

  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
