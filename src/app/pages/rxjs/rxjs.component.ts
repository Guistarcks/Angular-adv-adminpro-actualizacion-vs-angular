import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy  {


  public intervalSubs: Subscription;

  constructor() { 
    //TEMAS MUY IMPORTANTE LOS OBSERVABLES OJO
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
    
  
   // this.retornaObservable().pipe(
    //retry(2)
    //).subscribe(
    ///valor => console.log('Subs:', valor),
    //error => console.error('Error:', error),
    //() => console.info('Obs terminado')

    //);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
   //FUNCION OBSER
 retornaObservable (): Observable<number>{
  
  let i = -1;

   return  new Observable<number>( observable =>{
           
    const intervalo = setInterval(() =>{
    
    i++;
    observable.next(i);
     
    if( i === 4){
      
      clearInterval(intervalo);
       observable.complete();
    }
    if(i === 2){
      
    
      observable.error('i llego al valor 2');

    }
    
  }, 1000)
   
  });
 
 }


 retornaIntervalo (): Observable<number>{
 
  return interval (100)
                     .pipe(
                      //take(10),
                      map(valor => valor +1),
                      filter(valor => (valor % 2 === 0)? true: false),
                      
                      
                     
                     );
 

}
}
