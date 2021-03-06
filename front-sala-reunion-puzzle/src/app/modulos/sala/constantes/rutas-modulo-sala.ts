import {Routes} from '@angular/router';
import {RutaListarSalasComponent} from '../rutas/ruta-listar-salas/ruta-listar-salas.component';
import {RutaSalaReunionComponent} from '../rutas/ruta-sala-reunion/ruta-sala-reunion.component';
import {EstaLogueadoGuard} from '../../../servicios/esta-logueado.guard';

export const RUTAS_MODULO_SALA: Routes = [
  {
    path: 'listar-salas',
    component: RutaListarSalasComponent,
    canActivate: [EstaLogueadoGuard]
  },
  {
    path: 'sala-reunion/:idSala',
    component: RutaSalaReunionComponent,
    canActivate: [EstaLogueadoGuard]
  },
];
