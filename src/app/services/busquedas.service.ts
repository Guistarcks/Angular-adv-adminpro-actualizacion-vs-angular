import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/clientes.model';
import { Clinica } from '../models/clinicas.model';
import { Doctor } from '../models/doctores.model';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http:HttpClient) { }


  //Envia el Token
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  // Devuelve un objeto Headers
  get headers() {
      return{
       headers:{
         'x-token': this.token
        }
      }
     }

private transformaUsuarios ( resultados : any [] ) :Usuario[] {

  return resultados.map(
   user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid));
  }  

private transformaClinicas ( resultados : any [] ) :Clinica[] {
return resultados;
}

private transformaDoctores ( resultados : any [] ) :Doctor[] {
  return resultados;
  
  }
private transformaClientes ( resultados : any [] ) :Cliente[] {
    return resultados;
    
    }



 buscar(tipo: 'usuarios'|'clinicas'|'doctores',termino:string){

  const url =`${ base_url }/todo/coleccion/${ tipo }/${ termino }`;

   return this.http.get<any[]>( url, this.headers)
                   .pipe(
                    map( ( resp : any ) => {

                      switch ( tipo ) {

                        case 'usuarios':
                          return this.transformaUsuarios( resp.resultados )
                        
                        

                        default:
                          return[];
                      }
                    })
                   );
  }

 buscarclinica(tipo: 'clinicas',termino:string){

    const url =`${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
  
     return this.http.get<any[]>( url, this.headers)
                     .pipe(
                      map( ( resp : any ) => {
  
                        switch ( tipo ) {
  
                          case 'clinicas':
                            return this.transformaClinicas( resp.resultados )
                          
                        
  
                          default:
                            return[];
                        }
                      })
                     );
    }

 buscarDoctor(tipo: 'doctores', termino:string){

      const url =`${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    
       return this.http.get<any[]>( url, this.headers)
                       .pipe(
                        map( ( resp : any ) => {
    
                          switch ( tipo ) {
    
                            case 'doctores':
                              return this.transformaDoctores( resp.resultados )
                            
                          
    
                            default:
                              return[];
                          }
                        })
                       );
      }

 buscarCliente(tipo: 'clientes', termino:string){

        const url =`${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
      
         return this.http.get<any[]>( url, this.headers)
                         .pipe(
                          map( ( resp : any ) => {
      
                            switch ( tipo ) {
      
                              case 'clientes':
                                return this.transformaClientes( resp.resultados )
                              
                            
      
                              default:
                                return[];
                            }
                          })
                         );
        }
  
}
