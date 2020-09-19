import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EstaLogueadoGuard implements CanActivate {

  estaLogueado: string;

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.estaLogueado = localStorage.getItem('usuario');

    if (this.estaLogueado) {
      return true;
    } else {
      return false;
    }
  }
}
