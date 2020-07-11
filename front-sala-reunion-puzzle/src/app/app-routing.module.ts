import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {RUTAS_MODULO_SALAS} from './modulos/salas/constantes/rutas-modulo-salas';

const routes: Routes = [
  {
    path: 'inicio',
    component: RutaInicioComponent
  },
  ...RUTAS_MODULO_SALAS,
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
