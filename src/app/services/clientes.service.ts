import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/clientes.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
 export class ClientesService {
 public cliente!: Cliente;

//Enviar el token 
   get token(): string{
  return localStorage.getItem('token') || '';
   }
//Enviar el Id del usuario
   get uidCliente(): string{
  return this.cliente._id || '';
   }
//Devuelve un objeto Headers
   get headers(){
return{
  headers:{
    'x-token': this.token
  }
}

   }
  constructor( private http : HttpClient) { }
 
// Cargar listado de clientes 
  cargarClientes(){
      //http://localhost:3000/api/clientes
   const url = `${ base_url }/clientes`;
     return this.http.get( url, this.headers)
                      .pipe(
                       delay(800),
                       map( (resp: any) => resp.clientes )

  )

  }

// crear Clientes
  crearClientes( cliente: {nombre: String, email:String, telefono:String, clinica:String} ){
  //http://localhost:3000/api/clientes
  const url =`${ base_url }/clientes`;
  return this.http.post( url,cliente, this.headers);
                
}
// borrar Cliente
   borrarCliente( cliente: Cliente){
  //http://localhost:3000/api/clientes/61b7bb2a02689023dd16b5fd
  const url =`${ base_url }/clientes/${ cliente._id }`;
  return this.http.delete( url,this.headers);               
}
   // actualizar Cliente
  actualizarCliente(cliente: Cliente){
    //http://localhost:3000/api/clientes/61b7bb2a02689023dd16b5fd
  const url =`${ base_url }/clientes/${ cliente._id }`;
  return this.http.put( url, cliente , this.headers);
  }
  // Cargar cliente por Id OJO
  SeleccionarClienteId( id: string ){
      //http://localhost:3000/api/clientes/62684f243decd9ba188fbc47
      const url =`${ base_url }/clientes/${ id }`;
          return this.http.get( url, this.headers)
                          .pipe(
                           map( (resp: any) => resp.cliente ) 
                          ) 
      
  }

}
