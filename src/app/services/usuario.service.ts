import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interfaces';





const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 public usuario! : Usuario; 

 //Envia el Token
  get token(): string{
    return localStorage.getItem('token') || '';
  }

 //Envia el Id del usuario
  get uidUser(): string{
     return this.usuario.uid || '';
  }

  // Devuelve un objeto Headers
  get headers() {
   return{
    headers:{
      'x-token': this.token
     }
   }
  }

  constructor( private http: HttpClient, private router:Router ) { }

  logout(){
   localStorage.removeItem('token');
   this.router.navigateByUrl('/login');
  }

  //Comprobación Token 
   validarToken(): Observable<boolean>{

    return this.http.get(`${ base_url }/login/novot`,this.headers
    ).pipe(
     tap(( resp:any ) =>{
    //console.log( resp);

   const{ nombre, email, role, google, img,uid } = resp.usuario;
   this.usuario = new Usuario(nombre,email,'',role, google, img, uid)
     
     localStorage.setItem('token', resp.token);
    }),
    map( resp => true ),
    catchError( error => of( false ))
  );
  }

  //Ojo estamos llamando RegisterForm(Es una interfaces/register-Form.interface)
   crearUsuario( formData: RegisterForm ){
  
  return this.http.post(`${ base_url }/usuarios`,formData)
                   .pipe(
                     tap( (resp :any) => {
                      localStorage.setItem('token', resp.token) // Guarda el token en el Local Storage.
                     })
                    );                              

  }

   // Actualizar Perfil del usuario
   actualizarPerfil( data:{email:string, nombre: string, role: string}){
   data ={
   ...data,
    role: this.usuario.role!
   };
    return this.http.put(`${ base_url }/usuarios/${ this.uidUser}`, data , this.headers);
  }

   //Ojo estamos llamando LoginForm(Es una interfaces/login-Form.interface)
  loginUsuario( formData: LoginForm ){
  
    return this.http.post(`${ base_url }/login`,formData)
               .pipe(
                tap( (resp :any) => {
                 localStorage.setItem('token', resp.token) // Guarda el token en el Local Storage.
                })
               );
  
  }

 // Cargar listado de usuarios en el Perfil de usuarios
  cargarUsuarios( desde: number = 0){
     //http://localhost:3000/api/usuarios?desde=5
     const url =`${ base_url }/usuarios?desde=${ desde }`
     return this.http.get<CargarUsuario>( url, this.headers)
                 .pipe(
                  delay(500),
                  map(resp => {
                    const usuarios = resp.usuarios.map(
                    user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid));
                    
                    return{
                   
                      total: resp.total,
                      usuarios
                     
                    };
                 
                  })
                 )

  }

  // Eliminar usuarios 
  eliminarUsuario( usuario: Usuario ){
  //http://localhost:3000/api/usuarios/61b7bb2a02689023dd16b5fd
  const url =`${ base_url }/usuarios/${ usuario.uid }`;
  return this.http.delete( url, this.headers);
   
  }

  // Guardar Rol modificado 
  guardarUsuario( usuario:Usuario ){
 
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid}`, usuario , this.headers);
  }
}

