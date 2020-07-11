import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramaGlobalComponent } from './diagrama-global/diagrama-global.component';
import {GojsAngularModule} from 'gojs-angular';



@NgModule({
  declarations: [DiagramaGlobalComponent],
  exports: [
    DiagramaGlobalComponent
  ],
  imports: [
    CommonModule,
    GojsAngularModule
  ]
})
export class DiagramaGlobalModule { }
