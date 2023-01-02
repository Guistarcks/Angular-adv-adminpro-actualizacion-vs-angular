import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { IncrementadorBComponent } from './incrementador-b/incrementador-b.component';
import {FormsModule} from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalActualizarclientesComponent } from './modal-actualizarclientes/modal-actualizarclientes.component'


@NgModule({
  declarations: [
    IncrementadorComponent,
    IncrementadorBComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalActualizarclientesComponent
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
    ModalImagenComponent,
    ModalActualizarclientesComponent
      
  ]
})
export class ComponentsModule { }
