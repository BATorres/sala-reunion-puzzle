import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaInteractivaUsuarioComponent } from './pantalla-interactiva-usuario/pantalla-interactiva-usuario.component';
import {PaletaModule} from '../../../../componentes/paleta/paleta.module';
import {DiagramaEditableModule} from '../../../../componentes/diagrama-editable/diagrama-editable.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [PantallaInteractivaUsuarioComponent],
  exports: [
    PantallaInteractivaUsuarioComponent
  ],
  imports: [
    CommonModule,
    PaletaModule,
    DiagramaEditableModule,
    FontAwesomeModule
  ]
})
export class PantallaInteractivaUsuarioModule { }
