import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaRegistrarUsuarioComponent} from './rutas/ruta-registrar-usuario/ruta-registrar-usuario.component';
import {RutaLoginComponent} from './rutas/ruta-login/ruta-login.component';
import {FormularioRegistroUsuarioModule} from './componentes/formulario-registro-usuario/formulario-registro-usuario.module';
import {FormularioLoginModule} from './componentes/formulario-login/formulario-login.module';

@NgModule({
  declarations: [RutaRegistrarUsuarioComponent, RutaLoginComponent],
  imports: [
    CommonModule,
    FormularioRegistroUsuarioModule,
    FormularioLoginModule,
  ]
})
export class UsuarioModule {
}
