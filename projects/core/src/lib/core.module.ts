import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from './button/button.component';

/* need to import common module into the core module so the ngClass error goes away from the components of this module */
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent
  ]
})

export class CoreModule { }
