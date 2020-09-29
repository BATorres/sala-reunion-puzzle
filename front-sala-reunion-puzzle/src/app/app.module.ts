import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {SalaModule} from './modulos/sala/sala.module';
import {UsuarioModule} from './modulos/usuario/usuario.module';
import {ToasterModule} from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NuevoUsuarioSalaService} from './servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from './servicios/subscription/escuchar-acciones-usuario.service';
import {CabeceraModule} from './componentes/cabecera/cabecera.module';
import {EstaLogueadoGuard} from './servicios/esta-logueado.guard';
import {SalaService} from './servicios/sala.service';
import {CargandoService} from './servicios/cargando.service';
import {BlockUIModule} from 'primeng';
import {UsuarioSalaService} from './servicios/usuario-sala.service';
import {UsuarioService} from './servicios/usuario.service';
import {BuscarUsuariosEnSalaService} from './servicios/query/buscar-usuarios-en-sala.service';
import {DiagramaUsuarioService} from './servicios/diagrama-usuario.service';
import {TemasSalaService} from './servicios/temas-sala.service';
import {EscucharTemasSalaService} from './servicios/subscription/escuchar-temas-sala.service';

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
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    CabeceraModule,
    BlockUIModule
  ],
  providers: [
    NuevoUsuarioSalaService,
    EscucharAccionesUsuarioService,
    EstaLogueadoGuard,
    SalaService,
    CargandoService,
    UsuarioSalaService,
    UsuarioService,
    BuscarUsuariosEnSalaService,
    DiagramaUsuarioService,
    TemasSalaService,
    EscucharTemasSalaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
