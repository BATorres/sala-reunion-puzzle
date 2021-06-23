import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramaEditableComponent } from './diagrama-editable/diagrama-editable.component';
import {GojsAngularModule} from 'gojs-angular';



@NgModule({
  declarations: [DiagramaEditableComponent],
  exports: [
    DiagramaEditableComponent
  ],
  imports: [
    CommonModule,
    GojsAngularModule
  ]
})
export class DiagramaEditableModule { }
