import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

import { Cliente } from 'src/app/models/clientes.model';
import { Clinica } from 'src/app/models/clinicas.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public clinicas :Clinica[] = [];
  public clienteForm! :FormGroup;
  public clienteupForm! :FormGroup;
  public clinicaSeleccionada?: Clinica;
  public clienteidSeleccionado!:Cliente;
  public cargando : boolean = true;
  public clinica? :string;
  public formDisabled = false;
  
  //Iniciar variable reloj digital

  fecha: number = Date.now();
  hora:any;


  //Variables del Formulario Formcontacto
  Formcontacto = {
    _id: null,
    nombre: null,
    email: null,
    telefono:null,
    clinica:null
  }
 
  constructor(private clienteService :ClientesService,
              private clinicaServices :ClinicaService,
              private fb : FormBuilder,
              private busquedaservices:BusquedasService ) { }

  ngOnInit(): void {
   
    this.cargarClientes();
    this.inicializarHorario();
     //Inicializamos el  Formulario crear cliente 
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email:['',Validators.required],
      telefono:['',[Validators.required,Validators.maxLength(10)]],
      clinica:['',Validators.required]
     });
 
     //Inicializamos el Formulario actualizar cliente 
     this.clienteupForm = this.fb.group({
      _id: ['', Validators.required],
      nombre: ['', Validators.required],
      email:['',Validators.required],
      telefono:['',[Validators.required,Validators.maxLength(10)]],
      clinica:['',Validators.required]
     });

     //Realizar la carga de las clinicas
      this.cargarClinicas(); 
  }

   //Function para realizar la carga de los clientes,
     cargarClientes(){
     this.cargando = true;
     this.clienteService.cargarClientes()
                      .subscribe(clientes => {
                        
                        this.clientes = clientes;                                            
                        this.cargando = false;                      
  })}

     //Function para realizar la carga Clinicas,
     cargarClinicas(){
      this.clinicaServices.cargarClinicas()
        .subscribe( (clinicas : Clinica[])=>{
           
           this.clinicas = clinicas;
           
        })}
     //Function crear cliente
     crearCliente(){
     this.clienteService.crearClientes( this.clienteForm.value )
    .subscribe( (resp: any) =>{ 
     
     Swal.fire({
       icon: 'success',
        title: 'Cliente creado con exíto',
        showConfirmButton: false,
        timer: 1500
      });
      this.clienteForm.reset();
      this.cargarClientes();
    },(err) => {
     Swal.fire('!! Opss no ha sido posible crear el nuevo cliente !!', err.error.msg,'error');
   })}

     //Function Elininar Cliente
      eliminarCliente( cliente: Cliente  ){
      Swal.fire({
        title: '¿Borrar cliente?',
        text: `Esta a punto de borrar a ${ cliente.nombre }!`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!'
       }).then((result) => {
        if (result.isConfirmed) {
           this.clienteService.borrarCliente( cliente )
                              .subscribe ( resp => {
                                this.cargarClientes();
                                Swal.fire(
                                  'Clinica borrada',
                                  `${ cliente.nombre} fue eliminado correctamente`,
                                  'success'
                                );
                              })
         }
       },(err) => {
        Swal.fire('!! Opss no ha podido borrar el cliente algo salió mal!!', err.error.msg,'error');
     });
       return;
      
  }
    //Function Actualizar datos del cliente
      actualizarCliente( ){
      const data = { ...this.clienteupForm.value}
          
    this.clienteService.actualizarCliente( data )
                         .subscribe(resp => {
                        
      Swal.fire({
      icon: 'success',
       title: 'Datos modificados con exíto',
       showConfirmButton: false,
       timer: 1500
         })
       this.clienteupForm.reset();
       this.cargarClientes();
    }, (err) => {
        Swal.fire('!! Opss no ha sido posible realizar la modificación !!', err.error.msg,'error');
          })}
    //Funtion Actualizar datos del cliente
      buscarCliente( temino: string){
      if( temino.length == 0){

      return this.cargarClientes();

     }
      this.busquedaservices.buscarCliente('clientes', temino)
                        .subscribe((resp) => {
                         this.clientes = resp;
                        });}
  //Seleccionamos el cliente desde la tabla y cargamos la informacion al formulario OJO
      seleccionarCliente(id: string){

    this.clienteService.SeleccionarClienteId( id )
                        .subscribe((resp)=>{
                          this.Formcontacto = resp
                        
                        });
       

  }
     inicializarHorario(){
       this.hora = new Date();
       setInterval(()=>{
        this.hora = new Date();
       },1000);
     }
}
