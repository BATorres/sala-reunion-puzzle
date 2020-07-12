import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCrearSalaComponent} from './modal-crear-sala/modal-crear-sala.component';
import {FormularioCrearSalaModule} from '../../componentes/formulario-crear-sala/formulario-crear-sala.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ModalCrearSalaComponent],
  imports: [
    CommonModule,
    FormularioCrearSalaModule,
    MatDialogModule
  ]
})
export class ModalCrearSalaModule {
}
