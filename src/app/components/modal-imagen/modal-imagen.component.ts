import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadsService } from 'src/app/services/file-uploads.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir! :File;   
  public imgTemp:any = null;
  public archivoImg: any = [];
 
  constructor( public modalImagenService: ModalImagenService,
               public fileUploadsService: FileUploadsService ) { }

  ngOnInit(): void {
  }
  cerrarModal(){
  this.imgTemp = null;
  this.modalImagenService.cerrarModal();

}
  cambiarImagen( event:any ):any {
  const ImagenCapturada = event.target.files[0]
   this.imagenSubir = ImagenCapturada;
 
   if( !this.imagenSubir ){
  
    return this.imgTemp = null;
  }

    const reader = new FileReader();
    reader.readAsDataURL( this.imagenSubir );

    reader.onloadend = () =>{
    this.imgTemp = reader.result;
    
                         
       }

 
}

  subirImmagen(){
   const id  = this.modalImagenService.id;
   const tipo = this.modalImagenService.tipo;

   this.fileUploadsService
       .actualizarFoto( this.imagenSubir,tipo, id)
                          .then( img =>{
                          
                           /**Si es ok redenrizo la respuesta con el Alert  */
                           Swal.fire('Guardado','Imagen actualizada con exito', 'success');
                           this.modalImagenService.nuevaImagen.emit( img );
                           this.cerrarModal ();

                          }).catch(err =>{

                           /**En caso de error  */
                           Swal.fire('Oops..',`${err.error.msg}`,'error')
                          });

 }

}
