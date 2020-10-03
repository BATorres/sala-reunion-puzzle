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
import {CabeceraModule} from './componentes/cabecera/cabecera.module';
import {EstaLogueadoGuard} from './servicios/esta-logueado.guard';
import {CargandoService} from './servicios/cargando.service';
import {BlockUIModule} from 'primeng';
import {SERVICIOS_SUBSCRIPTION} from './servicios/constantes/servicios-subscription';
import { RutaAppComponent } from './rutas/ruta-app/ruta-app.component';
import {SERVICIOS_GENERALES} from './servicios/constantes/servicios-generales';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaNoEncontradaComponent,
    RutaAppComponent
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
    EstaLogueadoGuard,
    CargandoService,
    ...SERVICIOS_SUBSCRIPTION,
    ...SERVICIOS_GENERALES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
