import {Routes} from '@angular/router';
import {RutaCrearSalaComponent} from '../rutas/ruta-crear-sala/ruta-crear-sala.component';
import {RutaListarSalasComponent} from '../rutas/ruta-listar-salas/ruta-listar-salas.component';
import {RutaSalaReunionComponent} from '../rutas/ruta-sala-reunion/ruta-sala-reunion.component';

export const RUTAS_MODULO_SALA: Routes = [
  {
    path: 'crear-sala',
    component: RutaCrearSalaComponent,
  },
  {
    path: 'listar-salas',
    component: RutaListarSalasComponent,
  },
  {
    path: 'sala-reunion/:idSala',
    component: RutaSalaReunionComponent,
  },
];
