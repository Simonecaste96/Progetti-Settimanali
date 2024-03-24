import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FordComponent } from './components/ford/ford.component';
import { FiatComponent } from './components/fiat/fiat.component';
import { AudiComponent } from './components/audi/audi.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';



const routes: Routes = [
  { path:     '', component: HomeComponent}, // rotta home predefinita
  { path: 'ford', component: FordComponent}, // rotta per il componente Ford
  { path: 'fiat', component: FiatComponent}, // rotta per il componente Fiat
  { path: 'audi', component: AudiComponent}, // rotta per il componente Audi
  { path:  '**' , component: ErrorComponent}   //rotta per intercettare l'errore
];

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    FordComponent,
    FiatComponent,
    AudiComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
