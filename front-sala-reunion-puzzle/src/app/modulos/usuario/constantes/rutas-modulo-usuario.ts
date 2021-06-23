import {Routes} from '@angular/router';
import {RutaRegistrarUsuarioComponent} from '../rutas/ruta-registrar-usuario/ruta-registrar-usuario.component';
import {RutaLoginComponent} from '../rutas/ruta-login/ruta-login.component';

export const RUTAS_MODULO_USUARIO: Routes = [
  {
    path: 'registrarse',
    component: RutaRegistrarUsuarioComponent
  },
  {
    path: 'login',
    component: RutaLoginComponent
  }
];
