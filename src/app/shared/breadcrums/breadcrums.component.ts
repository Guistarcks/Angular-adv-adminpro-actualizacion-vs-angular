import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnDestroy  {
  
  //CAPTURAR EVENTOS Y ASIGNAR TITULOS A LOS BREAD
  public  titulo!:string;


  public tituloSubs$: Subscription;

  constructor( private router:Router) {
   
  this.tituloSubs$ = this.getdataArgumentotitulo()
                             .subscribe( ({ titulo }) => {
                              this.titulo = titulo;
                             document.title = `Admin-Pro - ${titulo}`;
                             });
    
   }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }



   // METODDO PARA EXTRAER EN TITULO DE CADA RUTA.
   getdataArgumentotitulo(){

     return this.router.events
    .pipe(
     filter<any>( event => event instanceof ActivationEnd ),
     filter( (event: ActivationEnd ) => event.snapshot.firstChild === null ),
     map((event:ActivationEnd) => event.snapshot.data),

    );
  


   }
 
}
