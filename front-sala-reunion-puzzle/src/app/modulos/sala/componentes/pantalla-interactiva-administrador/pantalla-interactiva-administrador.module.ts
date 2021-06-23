import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PantallaInteractivaAdministradorComponent} from './pantalla-interactiva-administrador/pantalla-interactiva-administrador.component';
import {PaletaModule} from '../../../../componentes/paleta/paleta.module';
import {DiagramaGlobalModule} from '../../../../componentes/diagrama-global/diagrama-global.module';
import {TabViewModule} from 'primeng/tabview';
import {DiagramaEditableModule} from '../../../../componentes/diagrama-editable/diagrama-editable.module';
import {FormsModule} from '@angular/forms';
import {VirtualScrollerModule} from 'primeng';

@NgModule({
  declarations: [
    PantallaInteractivaAdministradorComponent
  ],
  exports: [
    PantallaInteractivaAdministradorComponent
  ],
  imports: [
    CommonModule,
    PaletaModule,
    DiagramaGlobalModule,
    TabViewModule,
    DiagramaEditableModule,
    FormsModule,
    VirtualScrollerModule,
  ]
})
export class PantallaInteractivaAdministradorModule {
}
