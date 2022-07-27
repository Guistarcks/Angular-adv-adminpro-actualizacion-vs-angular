import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { FileUploadsService } from 'src/app/services/file-uploads.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir! :File;   
  public imgTemp:any = null;
  public archivoImg: any = [];



  constructor( private fb:FormBuilder, 
               private usuarioservice:UsuarioService,
               private fileUploadsService: FileUploadsService,
               ) {
              
              this.usuario = usuarioservice.usuario;

                }

  ngOnInit(): void {
   
    this.perfilForm = this.fb.group({
    nombre:[this.usuario.nombre, Validators.required ],
    email: [this.usuario.email, [Validators.required, Validators.email ]],

    });
  }

  actualizarPerfil(){
   
    this.usuarioservice.actualizarPerfil( this.perfilForm.value )
    .subscribe( () =>{
     
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email; 
      Swal.fire('Guardado','Cambios fueron guardados', 'success');
       
    }, (err) => {
        Swal.fire('!! Opsss... algo salio mal revise todos los campos !!', err.error.msg, 'error')
       
    });
  }

  cambiarImagen( event:any ):any {
    const ImagenCapturada = event.target.files[0]
     this.imagenSubir = ImagenCapturada;
   
     if(!this.imagenSubir){
    
      return this.imgTemp = null;
    }

      const reader = new FileReader();
      reader.readAsDataURL( this.imagenSubir );

      reader.onloadend = () =>{
      this.imgTemp = reader.result;
      
                           
         }
 
   
  }

  subirImmagen(){
   this.fileUploadsService.actualizarFoto( this.imagenSubir,'usuarios', this.usuario.uid )
                           .then( img =>{
                            this.usuario.img = img;
                            /**Si es ok redenrizo la respuesta con el Alert  */
                            Swal.fire('Guardado','Imagen de usuario actualizada', 'success')
                           }).catch(err =>{

                            /**En caso de error  */
                            Swal.fire('Oops..',`${err.error.msg}`,'error')
                           });

  }
}
