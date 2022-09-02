import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctores.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public doctor! : Doctor; 

   //Envia el Token
   get token(): string{
    return localStorage.getItem('token') || '';
  }
  //Envia el Id del usuario
   get uidDoctor(): string{
    return this.doctor._id || '';
 }

  // Devuelve un objeto Headers
  get headers() {
   return{
    headers:{
      'x-token': this.token
     }
   }
  }

  constructor( private http : HttpClient) { }

// Cargar listado de doctores 
  cargarDoctores(){
//http://localhost:3000/api/doctores
const url =`${ base_url }/doctores`;
    return this.http.get( url, this.headers)
                    .pipe(
                     delay(800),
                     map( (resp : any ) => resp.doctores) 
                    ) 

 }

  // Cargar doctores por Id 
  cargarDoctorId( id: string ){
    //http://localhost:3000/api/doctores/62684f243decd9ba188fbc47
    const url =`${ base_url }/doctores/${ id }`;
        return this.http.get( url, this.headers)
                        .pipe(
                         map( (resp: any) => resp.doctor ) 
                        ) 
    
     }


   // crear Doctores
 crearDoctores( clinica: {nombre: string, clinica: string}){
  //http://localhost:3000/api/doctores
  const url =`${ base_url }/doctores`;
  return this.http.post( url, clinica, this.headers);
                
 }
  // actualizar Doctor
 actualizaDoctores( doctor: Doctor ){
  //http://localhost:3000/api/doctores/61b7bb2a02689023dd16b5fd
  const url =`${ base_url }/doctores/${ doctor._id }`;
   return this.http.put( url, doctor , this.headers);

                
 }
  // borrar Doctor
 borrarDoctor( doctor: Doctor){
  //http://localhost:3000/api/clinicas/61b7bb2a02689023dd16b5fd
  const url =`${ base_url }/doctores/${ doctor._id }`;
  return this.http.delete( url,this.headers);
                
}



}
