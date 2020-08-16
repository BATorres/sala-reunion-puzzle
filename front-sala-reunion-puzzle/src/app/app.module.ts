import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {SalaModule} from './modulos/sala/sala.module';
import {BuscarUsuariosService} from './servicios/query/buscar-usuarios.service';
import {BuscarUsuariosEnSalaService} from './servicios/query/buscar-usuarios-en-sala.service';
import {UsuarioModule} from './modulos/usuario/usuario.module';
import {RegistrarUsuarioService} from './servicios/mutation/registrar-usuario.service';
import {ToasterModule} from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NuevaSalaService} from './servicios/subscription/nueva-sala.service';
import {UnirseSalaService} from './servicios/mutation/unirse-sala.service';
import {AccionesUsuarioSalaService} from './servicios/mutation/acciones-usuario-sala.service';
import {NuevoUsuarioSalaService} from './servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from './servicios/subscription/escuchar-acciones-usuario.service';
import {BuscarDiagramaUsuarioService} from './servicios/query/buscar-diagrama-usuario.service';
import {CrearDiagramaService} from './servicios/mutation/crear-diagrama.service';
import {ActualizarDiagramaService} from './servicios/mutation/actualizar-diagrama.service';
import {CabeceraModule} from './componentes/cabecera/cabecera.module';
import {EstaLogueadoGuard} from './servicios/esta-logueado.guard';
import {SalaService} from './servicios/sala.service';
import {CargandoService} from './servicios/cargando.service';
import {BlockUIModule} from 'primeng';

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
    BuscarUsuariosEnSalaService,
    BuscarUsuariosService,
    RegistrarUsuarioService,
    NuevaSalaService,
    UnirseSalaService,
    AccionesUsuarioSalaService,
    NuevoUsuarioSalaService,
    EscucharAccionesUsuarioService,
    BuscarDiagramaUsuarioService,
    CrearDiagramaService,
    ActualizarDiagramaService,
    EstaLogueadoGuard,
    SalaService,
    CargandoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
