import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GraphQLModule} from './apollo.config';
import {RutaListarSalasModule} from './rutas/ruta-listar-salas/ruta-listar-salas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    RutaListarSalasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
