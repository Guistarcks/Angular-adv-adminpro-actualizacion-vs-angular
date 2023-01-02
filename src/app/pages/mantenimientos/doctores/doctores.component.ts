import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctores.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styles: [
  ]
})
export class DoctoresComponent implements OnInit {

  public doctores: Doctor[] = [];
  public cargando : boolean = true;
  public imgSubs!: Subscription;

  constructor( private doctorSevice: DoctorService,
               private modalImageService: ModalImagenService,
               private busquedaservice: BusquedasService ) { }


  // Con OnDestroy evitamos el consumo de memoria.
   ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
   } 
  

  ngOnInit(): void {
   this.cargarDoctores()
   // Llamamos el servicio y realizamos un subscribe para actualizar la info
   this.imgSubs = this.modalImageService.nuevaImagen
   .pipe(delay( 200 ))
    .subscribe( img => {
      this.cargarDoctores();
    });
  }

  // Carga Doctores
  cargarDoctores(){

   this.cargando = true;
   this.doctorSevice.cargarDoctores()
      .subscribe(doctores =>{
        this.doctores = doctores;
        this.cargando = false;

      })
    
  
  }

  // Guargar modificaciones nombre
  guardarCambios( doctor: Doctor  ){
    this.doctorSevice.actualizaDoctores( doctor )
        .subscribe(resp => {
    
      Swal.fire({
     icon: 'success',
     title: 'Nombre modificado con exíto',
     showConfirmButton: false,
     timer: 1500
       })
       //this.cargarDct();
   }, (err) => {
      Swal.fire('!! Opss no ha sido posible realizar la modificación !!', err.error.msg,'error');
   })
         
     }
  
   // Eliminar Doctor
   eliminarDoctor( doctor: Doctor  ){
    Swal.fire({
      title: '¿Borrar Doctor?',
      text: `Esta a punto de borrar a ${ doctor.nombre }!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
     }).then((result) => {
      if (result.isConfirmed) {
         this.doctorSevice.borrarDoctor( doctor )
                            .subscribe ( resp => {
                              this.cargarDoctores();
                              Swal.fire(
                                'Clinica borrada',
                                `${ doctor.nombre} fue eliminado correctamente`,
                                'success'
                              );
                            })
       }
     });
     return;
    
    }

    // CrearDoctores
    async abrirSweetAlertcrearDoctores(){
      
      const { value ='' } = await Swal.fire({
        
        title:'Crear Doctor',
        text:'Ingrese el nombre del doctor',
        input: 'text',
        inputPlaceholder: 'Nombre doctor',
        showCancelButton: true
  
      })
      
      if( value.trim().length > 0){
          this.doctorSevice.crearDoctores( value )
              .subscribe( (resp: any)=> {
                this.doctores.push( resp.doctor )
                
                Swal.fire({
                  icon: 'success',
                   title: 'Doctor creado con exíto',
                   showConfirmButton: false,
                   timer: 1500
                 })

          }, (err) => {
            Swal.fire('!! Opss no ha sido posible realizar la Creacón !!', err.error.msg,'error');
          })
          
      }
      
    }
       //Modificar imagen clinica
    abrirModal ( doctor: Doctor){

    this.modalImageService.abrirModal ('doctores' , doctor._id, doctor.img );
     
    }
    

     //Busqueda clinicas:
     buscarDoctor( termino: string ) {
      // El caso de no localizar el usuario volvemos a cargar 
      if( termino.length === 0 ){
      
       return this.cargarDoctores(); 
      }
  
      this.busquedaservice.buscarDoctor('doctores', termino )
                           .subscribe( resp =>{
                            this.doctores = resp;
  
                           } );
     }
 
      //Busqueda clinicas:
     buscarDoctorSelector( e:any ) {
      console.log(e);
      // El caso de no localizar el usuario volvemos a cargar 
      if( e.length === 0 ){
      
       return this.cargarDoctores(); 
      }
  
      this.busquedaservice.buscarDoctor('doctores', e )
                           .subscribe( resp =>{
                            this.doctores = resp;
  
                           } );
     }
} 

