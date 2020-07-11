import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormularioRegistroUsuarioComponent} from './formulario-registro-usuario/formulario-registro-usuario.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FormularioRegistroUsuarioComponent],
  exports: [
    FormularioRegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormularioRegistroUsuarioModule {
}
