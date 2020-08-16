import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaListarSalasComponent} from './rutas/ruta-listar-salas/ruta-listar-salas.component';
import {RutaSalaReunionComponent} from './rutas/ruta-sala-reunion/ruta-sala-reunion.component';
import {DiagramaEditableModule} from '../../componentes/diagrama-editable/diagrama-editable.module';
import {PaletaModule} from '../../componentes/paleta/paleta.module';
import {PantallaInteractivaUsuarioModule} from './componentes/pantalla-interactiva-usuario/pantalla-interactiva-usuario.module';
import {PantallaInteractivaAdministradorModule} from './componentes/pantalla-interactiva-administrador/pantalla-interactiva-administrador.module';
import {FormularioCrearSalaModule} from './componentes/formulario-crear-sala/formulario-crear-sala.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalCrearSalaModule} from './modales/modal-crear-sala/modal-crear-sala.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RutaListarSalasComponent,
    RutaSalaReunionComponent,
  ],
  imports: [
    CommonModule,
    DiagramaEditableModule,
    PaletaModule,
    PantallaInteractivaUsuarioModule,
    PantallaInteractivaAdministradorModule,
    FormularioCrearSalaModule,
    MatDialogModule,
    ModalCrearSalaModule,
    RouterModule,
    FormsModule
  ]
})
export class SalaModule {
}
