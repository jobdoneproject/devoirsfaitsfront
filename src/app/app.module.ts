import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageLandingComponent } from './page-landing/page-landing.component';

const routes: Routes = [
  { path: 'landing-page', component: PageLandingComponent },
  { path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PageLandingComponent
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
