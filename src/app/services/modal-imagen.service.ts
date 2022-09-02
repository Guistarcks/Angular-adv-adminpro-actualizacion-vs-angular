import { Injectable,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal : boolean = true;
         
  public id? :string  ;          
  public img? :string ;
  public tipo!: 'usuarios'|'clinicas'| 'doctores' ;

  // EventeEmitter se encarga de actualizar la image en el listado de usuario
  // nuevaImagen es un observable
  public nuevaImagen : EventEmitter<string> = new EventEmitter<string>(); 

  get ocultarModal(){
  return this._ocultarModal;

  }
  
  abrirModal ( 
    
  tipo: 'usuarios'|'clinicas'| 'doctores',  
  id?:string ,
  img:string ='no-img' ){
   
   this._ocultarModal = false; 
   this.tipo =  tipo;
   this.id = id;
   //this.img = img;
   //http://localhost:3000/api/uploads/usuarios/no-image.jpg
    
   if ( img.includes('https') ){
    this.img = img;
   } else{
    this.img = `${ base_url }/uploads/${ tipo }/${ img }`;
   }
  }

   cerrarModal(){
   
  this._ocultarModal = true;
    
  }

  constructor() { }
}
