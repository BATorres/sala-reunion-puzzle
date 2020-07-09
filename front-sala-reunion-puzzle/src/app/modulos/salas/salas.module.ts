import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaCrearSalaComponent} from './rutas/ruta-crear-sala/ruta-crear-sala.component';
import {RutaListarSalasComponent} from './rutas/ruta-listar-salas/ruta-listar-salas.component';
import {RutaSalaReunionComponent} from './rutas/ruta-sala-reunion/ruta-sala-reunion.component';

@NgModule({
  declarations: [
    RutaCrearSalaComponent,
    RutaListarSalasComponent,
    RutaSalaReunionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SalasModule {
}
