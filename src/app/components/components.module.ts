import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';



@NgModule({
  declarations: [
    SearchBarComponent
    // Anexar los componentes creados
  ],
  exports: [
    SearchBarComponent
    // Anexar los componentes creados
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
