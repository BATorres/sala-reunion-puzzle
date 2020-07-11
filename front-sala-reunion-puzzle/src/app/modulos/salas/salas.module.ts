import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaCrearSalaComponent} from './rutas/ruta-crear-sala/ruta-crear-sala.component';
import {RutaListarSalasComponent} from './rutas/ruta-listar-salas/ruta-listar-salas.component';
import {RutaSalaReunionComponent} from './rutas/ruta-sala-reunion/ruta-sala-reunion.component';
import {DiagramaEditableModule} from '../../componentes/diagrama-editable/diagrama-editable.module';
import {PaletaModule} from '../../componentes/paleta/paleta.module';
import {PantallaInteractivaUsuarioModule} from './componentes/pantalla-interactiva-usuario/pantalla-interactiva-usuario.module';
import {PantallaInteractivaAdministradorModule} from './componentes/pantalla-interactiva-administrador/pantalla-interactiva-administrador.module';

@NgModule({
  declarations: [
    RutaCrearSalaComponent,
    RutaListarSalasComponent,
    RutaSalaReunionComponent
  ],
  imports: [
    CommonModule,
    DiagramaEditableModule,
    PaletaModule,
    PantallaInteractivaUsuarioModule,
    PantallaInteractivaAdministradorModule
  ]
})
export class SalasModule {
}
