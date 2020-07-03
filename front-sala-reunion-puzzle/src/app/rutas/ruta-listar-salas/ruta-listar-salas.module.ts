import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaListarSalasComponent } from './ruta-listar-salas/ruta-listar-salas.component';



@NgModule({
  declarations: [RutaListarSalasComponent],
  exports: [
    RutaListarSalasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RutaListarSalasModule { }
