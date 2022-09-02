
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
  export class UsuariosComponent implements OnInit, OnDestroy {
 
  public totalUsuarios : number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
 
  public desde:number = 0;
  public cargando :boolean = true;
  public imgSubs!: Subscription;

  constructor( private usuarioSevices :UsuarioService, 
               private busquedaService :BusquedasService,
               private modalImagenService:ModalImagenService) { }

 // Con OnDestroy evitamos el consumo de memoria.
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  } 

  ngOnInit(): void {
   this.cargarUsuarios();
   // Llamamos el servicio y realizamos un subscribe para actualizar la info
   this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay( 200 ))
     .subscribe( img => {
     this.cargarUsuarios() 
     });
  }

   cambiarPagina( valor: number){
    this.desde += valor;
   
    if( this.desde < 0 ){
     this.desde = 0;

    }else if( this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
   }

   cargarUsuarios(){
    this.cargando = true;
    this.usuarioSevices.cargarUsuarios( this.desde )
       .subscribe(({ total, usuarios}) => {
       
        this.totalUsuarios = total;
        this.usuariosTemp = usuarios;
        this.usuarios = usuarios;
        this.cargando = false;
   
       })
   }

   eliminarUser( usuario: Usuario){
    
     if( usuario.uid === this.usuarioSevices.uidUser ){
      return Swal.fire( 'Error','No puede borrarse a si mismo' , 'error');
     }
     
     Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
     }).then((result) => {
      if (result.isConfirmed) {
         this.usuarioSevices.eliminarUsuario( usuario )
                            .subscribe ( resp => {
                              this.cargarUsuarios();
                              Swal.fire(
                                'Usuario borrado',
                                `${ usuario.nombre} fue eliminado correctamente`,
                                'success'
                              );
                              

                            })
       }
     });
     return;
   }

   cambiarRole( usuario :Usuario){
    this.usuarioSevices.guardarUsuario( usuario )
        .subscribe(resp => {
            Swal.fire({
           icon: 'success',
            title: 'Role modificado con exíto',
            showConfirmButton: false,
            timer: 1500
          })
        }, (err) => {
          Swal.fire('!! Opss no ha sido posible realizar la modificación !!', err.error.msg,'error');
        })
   }
   abrirModal ( usuario: Usuario){

   this.modalImagenService.abrirModal ('usuarios' , usuario.uid, usuario.img );

   }

   buscar( termino: string ) {
    // El caso de no localizar el usuario volvemos a cargar 
    if( termino.length === 0 ){
    
     return this.cargarUsuarios();  
    }

    this.busquedaService.buscar('usuarios', termino )
                        .subscribe( ( resp) =>{
                        this.usuarios = resp;

                         } );
   }
}
