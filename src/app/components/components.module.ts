import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { IonicModule } from "@ionic/angular";


@NgModule({
  declarations: [
    SearchbarComponent
  ],
  exports: [
    SearchbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
