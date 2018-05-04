import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { InscriptionAdminComponent } from './pages/inscription-admin/inscription-admin.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/formulaire-inscription-admin',
    pathMatch: 'full'
  },
  { path: 'formulaire-inscription-admin',
    component: InscriptionAdminComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    InscriptionAdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
