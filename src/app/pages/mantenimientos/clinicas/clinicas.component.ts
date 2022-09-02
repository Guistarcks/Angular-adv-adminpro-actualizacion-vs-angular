import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Clinica } from 'src/app/models/clinicas.model';
import { ClinicaService } from 'src/app/services/clinica.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styles: [
  ]
})
export class ClinicasComponent implements OnInit {
  
  public clinicas:Clinica[] = [];
  public cargando : boolean = true;
  public imgSubs!: Subscription;

  constructor( private clinicaService: ClinicaService,
               private modalImagenService : ModalImagenService,
               private busquedaservice: BusquedasService) { }


   // Con OnDestroy evitamos el consumo de memoria.
   ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
   } 

  ngOnInit(): void {
   
    this.cargarClinicas();
    // Llamamos el servicio y realizamos un subscribe para actualizar la info
   this.imgSubs = this.modalImagenService.nuevaImagen
   .pipe(delay( 200 ))
    .subscribe( img => {
      this.cargarClinicas();
    });

  }
   // Carga clinicas
    cargarClinicas(){
    this.cargando = true;
    this.clinicaService.cargarClinicas()
    .subscribe( clinicas  =>{
      this.clinicas = clinicas;
      this.cargando = false;
    })

   }
  // Guargar modificaciones nombre
    guardarCambios( clinica: Clinica  ){
   this.clinicaService.actualizaClinicas( clinica )
   .subscribe(resp => {
    
    Swal.fire({
    icon: 'success',
    title: 'Nombre modificado con exíto',
    showConfirmButton: false,
    timer: 1500
      })
      //this.cargarClinicas();
  }, (err) => {
     Swal.fire('!! Opss no ha sido posible realizar la modificación !!', err.error.msg,'error');
  })
        
    }
   // Eliminar Clinica
    eliminarClinica( clinica: Clinica  ){
    Swal.fire({
      title: '¿Borrar Clinica?',
      text: `Esta a punto de borrar a ${ clinica.nombre }!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
     }).then((result) => {
      if (result.isConfirmed) {
         this.clinicaService.borrarClinicas( clinica )
                            .subscribe ( resp => {
                              this.cargarClinicas();
                              Swal.fire(
                                'Clinica borrada',
                                `${ clinica.nombre} fue eliminado correctamente`,
                                'success'
                              );
                            })
       }
     });
     return;
    
    }
    // CrearClinica 
    async abrirSweetAlertcrearClinica(){
      
      const { value ='' } = await Swal.fire<string>({
        
        title:'Crear Clinica',
        text:'Ingrese el nombre de la nueva clinica',
        input: 'text',
        inputPlaceholder: 'Nombre Clinica',
        showCancelButton: true
  
      })
      
      if( value.trim().length > 0){
          this.clinicaService.crearClinicas( value! )
              .subscribe( (resp: any)=> {
                this.clinicas.push( resp.clinica )
                
                Swal.fire({
                  icon: 'success',
                   title: 'Clinica creada con exíto',
                   showConfirmButton: false,
                   timer: 1500
                 })

          }, (err) => {
            Swal.fire('!! Opss no ha sido posible realizar la Creacón !!', err.error.msg,'error');
          })
          
      }
      
    }
    //Modificar imagen clinica
    abrirModal ( clinica: Clinica){

      this.modalImagenService.abrirModal ('clinicas' , clinica._id, clinica.img );
   
    }
    //Busqueda clinicas:
    buscarclinica( termino: string ) {
      // El caso de no localizar el usuario volvemos a cargar 
      if( termino.length === 0 ){
      
       return this.cargarClinicas(); 
      }
  
      this.busquedaservice.buscarclinica('clinicas', termino )
                           .subscribe( resp =>{
                            this.clinicas = resp;
  
                           } );
     }
} 
