import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormularioCrearSalaComponent} from './formulario-crear-sala/formulario-crear-sala.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FormularioCrearSalaComponent],
  exports: [
    FormularioCrearSalaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormularioCrearSalaModule {
}
