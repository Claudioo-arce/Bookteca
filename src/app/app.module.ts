import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Importa el módulo de Ionic
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicializa Firebase
    AngularFireAuthModule, // Módulo de autenticación
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
