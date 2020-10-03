import {EscucharAccionesUsuarioService} from '../subscription/escuchar-acciones-usuario.service';
import {EscucharTemasSalaService} from '../subscription/escuchar-temas-sala.service';
import {NuevaSalaService} from '../subscription/nueva-sala.service';
import {NuevoUsuarioSalaService} from '../subscription/nuevo-usuario-sala.service';

export const SERVICIOS_SUBSCRIPTION = [
  EscucharAccionesUsuarioService,
  EscucharTemasSalaService,
  NuevaSalaService,
  NuevoUsuarioSalaService
];
