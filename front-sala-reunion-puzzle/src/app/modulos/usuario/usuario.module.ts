import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaRegistrarUsuarioComponent } from './rutas/ruta-registrar-usuario/ruta-registrar-usuario.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';



@NgModule({
  declarations: [RutaRegistrarUsuarioComponent, RutaLoginComponent],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
