import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {SalaModule} from './modulos/sala/sala.module';
import {BuscarUsuariosService} from './servicios/query/buscar-usuarios.service';
import {BuscarSalasService} from './servicios/query/buscar-salas.service';
import {BuscarUsuariosEnSalaService} from './servicios/query/buscar-usuarios-en-sala.service';
import {UsuarioModule} from './modulos/usuario/usuario.module';
import {RegistrarUsuarioService} from './servicios/mutation/registrar-usuario.service';
import {ToasterModule} from 'angular2-toaster';

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
    SalaModule,
    UsuarioModule,
    ToasterModule.forRoot()
  ],
  providers: [
    BuscarSalasService,
    BuscarUsuariosEnSalaService,
    BuscarUsuariosService,
    RegistrarUsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
