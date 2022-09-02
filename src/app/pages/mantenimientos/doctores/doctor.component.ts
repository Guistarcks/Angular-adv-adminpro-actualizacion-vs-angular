import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Clinica } from 'src/app/models/clinicas.model';
import { Doctor } from 'src/app/models/doctores.model';

import { ClinicaService } from 'src/app/services/clinica.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {
   
  public doctorForm! :FormGroup;
  public clinicas :Clinica[] = [];
  public clinicaSeleccionada?: Clinica;
  public doctorSeleccionado?:Doctor;
  public clinica? :string;
  public nombre? :string;

  constructor( private fb: FormBuilder,
               private clinicaServices :ClinicaService,
               private doctorServices:DoctorService,
               private router: Router,
               private activateRoute: ActivatedRoute ) { }



  

  ngOnInit(): void {
    
    //Obtener todos los paramentros que venga por URL desde activateRoute:)
  this.activateRoute.params.subscribe(({ id  }) =>{this.cargarDoctor ( id )});

    this.doctorForm = this.fb.group({
     nombre: ['', Validators.required],
     clinica:['',Validators.required]

    });
   
   this.cargarClinicas(); 
   // Al seleccionar una clinica carga automaticamente inf clinica coluna 02
   this.doctorForm.get('clinica')!.valueChanges
       .subscribe( clinicaId =>{
        this.clinicaSeleccionada = this.clinicas.find( c => c._id === clinicaId);
         
       })
  }
  

  cargarDoctor( id :string ){

   if ( id === 'nuevo'){
    return;
   }

  this.doctorServices.cargarDoctorId( id )
      .pipe(
        delay(800)
      )
      .subscribe( doctor => { 
        
      if ( !doctor ){
        this.router.navigateByUrl(`/dashboard/doctores`); 
        //return;  
        
        }
      const { nombre , clinica:{ _id}  } = doctor; 
      this.doctorSeleccionado = doctor;
      this.doctorForm.setValue({nombre, clinica: _id} )
      
       
      });

    
  }

  cargarClinicas(){
  
    this.clinicaServices.cargarClinicas()
        .subscribe( (clinicas : Clinica[])=>{
           this.clinicas = clinicas;
           
        } )
  }

  guardarDoctor(){

     if ( this.doctorSeleccionado ){
      // actualizar 
       const data ={

        ...this.doctorForm.value,
        _id: this.doctorSeleccionado._id
       }

       this.doctorServices.actualizaDoctores( data )
                          .subscribe(resp =>{
                            Swal.fire({
                              icon: 'success',
                               title: 'Datos actualizado correctamente',
                               showConfirmButton: false,
                               timer: 1500
                             });
                             this.router.navigateByUrl(`/dashboard/doctores`); 
                             
                          },(err) => {
                            Swal.fire('!! Opss no ha sido posible realizar la modificación !!', err.error.msg,'error');
                          })

     } else {
      // crear 
    const {nombre } = this.doctorForm.value;  
     this.doctorServices.crearDoctores( this.doctorForm.value )
                       .subscribe( (resp: any) =>{ 
                        Swal.fire({
                          icon: 'success',
                           title: 'Doctor creado con exíto',
                           showConfirmButton: false,
                           timer: 1500
                         });
                         this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor._id}`)
                       },(err) => {
                        Swal.fire('!! Opss no ha sido posible realizar la modificación !!', err.error.msg,'error');
                      })

     }



     
    

  }
}
