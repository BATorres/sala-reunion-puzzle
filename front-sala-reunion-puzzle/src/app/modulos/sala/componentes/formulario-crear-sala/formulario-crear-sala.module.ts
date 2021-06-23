import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormularioCrearSalaComponent} from './formulario-crear-sala/formulario-crear-sala.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [FormularioCrearSalaComponent],
  exports: [
    FormularioCrearSalaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormularioCrearSalaModule {
}
