import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [FormularioLoginComponent],
  exports: [
    FormularioLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormularioLoginModule { }
