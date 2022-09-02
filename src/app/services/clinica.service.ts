import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Clinica } from '../models/clinicas.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ClinicaService {


  public clinica! : Clinica; 

   //Envia el Token
   get token(): string{
    return localStorage.getItem('token') || '';
  }
  //Envia el Id del usuario
   get uidClinica(): string{
    return this.clinica._id || '';
 }

  // Devuelve un objeto Headers
  get headers() {
   return{
    headers:{
      'x-token': this.token
     }
   }
  }

  constructor(private http: HttpClient) { }

  // Cargar listado de clinicas
  cargarClinicas( ){
    //http://localhost:3000/api/clinicas
    const url =`${ base_url }/clinicas`;
    return this.http.get( url, this.headers)
                    .pipe(
                     delay(800),
                     map( (resp : any ) => resp.clinicas) 
                    ) 
 
 }
 // crear Clinicas
 crearClinicas( nombre: String ){
  //http://localhost:3000/api/clinicas
  const url =`${ base_url }/clinicas`;
  return this.http.post( url,{ nombre }, this.headers);
                
}
 // actualizar Clinicas
 actualizaClinicas( clinica:Clinica ){
  //http://localhost:3000/api/clinicas/61b7bb2a02689023dd16b5fd
  return this.http.put(`${ base_url }/clinicas/${ clinica._id }`,clinica, this.headers);
                
}
// borrar Clinicas
borrarClinicas( clinica:Clinica){
  //http://localhost:3000/api/clinicas/61b7bb2a02689023dd16b5fd
  const url =`${ base_url }/clinicas/${ clinica._id }`;
  return this.http.delete( url,this.headers);
                
}  

}
