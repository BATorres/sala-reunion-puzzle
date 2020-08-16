import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaRegistrarUsuarioComponent} from './rutas/ruta-registrar-usuario/ruta-registrar-usuario.component';
import {RutaLoginComponent} from './rutas/ruta-login/ruta-login.component';
import {FormularioUsuarioModule} from './componentes/formulario-usuario/formulario-usuario.module';

@NgModule({
  declarations: [RutaRegistrarUsuarioComponent, RutaLoginComponent],
  imports: [
    CommonModule,
    FormularioUsuarioModule
  ]
})
export class UsuarioModule {
}
