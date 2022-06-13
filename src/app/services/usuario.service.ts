import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor( private http: HttpClient, private router:Router) { }

logout(){
localStorage.removeItem('token');
this.router.navigateByUrl('/login');
}
//Comprobacion Token 
validarToken(): Observable<boolean>{
const token = localStorage.getItem('token') || '';

 return this.http.get(`${ base_url }/login/novot`,{
 headers:{
  'x-token': token }
 
 }).pipe(
     tap(( resp:any )=>{
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
