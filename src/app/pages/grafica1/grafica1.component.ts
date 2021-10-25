import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

 public graficaLabelsA: string[] = ['Media Venta dia', 'Media Venta semanal', 'Medida venta mensual'];
 public dataA   = [
  [10, 15, 80],

];
}
