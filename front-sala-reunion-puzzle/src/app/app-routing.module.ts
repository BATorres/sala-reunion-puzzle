import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {RutaCrearSalaComponent} from './modulos/salas/rutas/ruta-crear-sala/ruta-crear-sala.component';
import {RutaListarSalasComponent} from './modulos/salas/rutas/ruta-listar-salas/ruta-listar-salas.component';
import {RutaSalaReunionComponent} from './modulos/salas/rutas/ruta-sala-reunion/ruta-sala-reunion.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: RutaInicioComponent
  },
  {
    path: 'crear-sala',
    component: RutaCrearSalaComponent,
  },
  {
    path: 'listar-salas',
    component: RutaListarSalasComponent,
  },
  {
    path: 'sala-reunion',
    component: RutaSalaReunionComponent,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: RutaNoEncontradaComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
