import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {RUTAS_MODULO_SALA} from './modulos/sala/constantes/rutas-modulo-sala';
import {RUTAS_MODULO_USUARIO} from './modulos/usuario/constantes/rutas-modulo-usuario';
import {RutaAppComponent} from './rutas/ruta-app/ruta-app.component';
import {EstaLogueadoGuard} from './servicios/esta-logueado.guard';

const routes: Routes = [
  {
    path: 'inicio',
    component: RutaInicioComponent
  },
  ...RUTAS_MODULO_USUARIO,
  {
    path: 'app',
    component: RutaAppComponent,
    canActivate: [EstaLogueadoGuard],
    children: [
      ...RUTAS_MODULO_SALA,
    ]
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
