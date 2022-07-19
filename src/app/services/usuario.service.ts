import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';




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

constructor( private http: HttpClient, private router:Router ) { }

logout(){
localStorage.removeItem('token');
this.router.navigateByUrl('/login');
}

//Comprobacion Token 
validarToken(): Observable<boolean>{

 return this.http.get(`${ base_url }/login/novot`,{
 headers:{
  'x-token': this.token
  }
 
 }).pipe(
     tap(( resp:any )=>{
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

actualizarPerfil( data:{email:string, nombre: string, role: string}){
  data ={
   ...data,
   role: this.usuario.role!
  };

  return this.http.put(`${ base_url }/usuarios/${ this.uidUser}`, data ,{
    headers:{
      'x-token': this.token
     }

  });


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
}
