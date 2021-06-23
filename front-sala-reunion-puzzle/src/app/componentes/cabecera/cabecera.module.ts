import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabeceraComponent} from './cabecera/cabecera.component';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [CabeceraComponent],
  exports: [
    CabeceraComponent
  ],
  imports: [
    CommonModule,
    MenubarModule
  ]
})
export class CabeceraModule {
}
