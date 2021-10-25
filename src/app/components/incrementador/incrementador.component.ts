import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {
  //En el caso de querer renombrar el argumento en el Padre
  //@Input('valor')progreso: number = 1;
  @Input('valor') progreso: number = 1;
    //Emitir Evento de valor Salida con tipado X.
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

    cambiarValor( valor : number ) {
     
      if( this.progreso >= 100 && valor >= 0 ) {
        this.valorSalida.emit(100);
        this.progreso = 100;
        return;
      }
      
      if ( this.progreso <= 0 && valor < 0){
        this.valorSalida.emit(0); 
        this.progreso = 0; 
         return;
      }
  
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
   }
   //Emitir valor Caja de texto (Ojo html =>(ngModelChange)="onChangeb($event)")
   onChange ( nuevoValor: number){
  
  if(nuevoValor >= 100){
   this.progreso = 100;
   }else if (this.progreso <= 0){
    this.progreso = 0;
   }else{
    this.progreso = nuevoValor;
  }
   this.valorSalida.emit( this.progreso);     
    
    

   }

}
