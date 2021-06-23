import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaletaComponent } from './paleta/paleta.component';
import {GojsAngularModule} from 'gojs-angular';



@NgModule({
  declarations: [PaletaComponent],
  exports: [
    PaletaComponent
  ],
  imports: [
    CommonModule,
    GojsAngularModule
  ]
})
export class PaletaModule { }
