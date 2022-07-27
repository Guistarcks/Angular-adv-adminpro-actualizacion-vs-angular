import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { IncrementadorBComponent } from './incrementador-b/incrementador-b.component';
import {FormsModule} from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component'


@NgModule({
  declarations: [
    IncrementadorComponent,
    IncrementadorBComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ], 
  exports:[
    IncrementadorComponent,
    IncrementadorBComponent,
    DonaComponent,
    ModalImagenComponent
      
  ]
})
export class ComponentsModule { }
