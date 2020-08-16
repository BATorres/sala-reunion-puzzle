import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [FormularioUsuarioComponent],
  exports: [
    FormularioUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormularioUsuarioModule { }
