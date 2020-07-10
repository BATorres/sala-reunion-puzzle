import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {SalasModule} from './modulos/salas/salas.module';
import {BuscarUsuariosService} from './servicios/query/buscar-usuarios.service';
import {BuscarSalasService} from './servicios/query/buscar-salas.service';
import {BuscarUsuariosEnSalaService} from './servicios/query/buscar-usuarios-en-sala.service';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaNoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    SalasModule
  ],
  providers: [
    BuscarSalasService,
    BuscarUsuariosEnSalaService,
    BuscarUsuariosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
