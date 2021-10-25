import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador-b',
  templateUrl: './incrementador-b.component.html',
  styles: [
  ]
})
export class IncrementadorBComponent  {
 //En el caso de querer renombrar el argumento en el Padre
 //@Input('valor')progreso: number = 1;
  @Input('valorb') progresob: number = 1;
 
  @Output() valorSalidab: EventEmitter<number> = new EventEmitter();

  cambiarValorb( valorb : number ) {
    if( this.progresob >= 100 && valorb >= 0 ) {
       this.valorSalidab.emit(100);
      this.progresob = 100;
      return;
    }
    
    if ( this.progresob <= 0 && valorb < 0){
       this.valorSalidab.emit(0);
      this.progresob = 0; 
       return;
    }

  this.progresob = this.progresob + valorb;
  this.valorSalidab.emit(this.progresob);
 }

 //Emitir valor Caja de texto (Ojo html =>(ngModelChange)="onChangeb($event)")
 onChangeb ( nuevoValorb: number ) {
  if(nuevoValorb >=100){
  
    this.progresob =100;

  }else if( nuevoValorb <=0){
    this.progresob =0;
  }else{
    this.progresob = nuevoValorb;
  }
  this.valorSalidab.emit( this.progresob );
 }

}
