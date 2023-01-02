import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Clinica } from 'src/app/models/clinicas.model';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit {
  public clinicas :Clinica[] = [];
  monthSelect!: any[];
  getDaysFromDate!: string;
  dateSelect: any;
  dateValue: any;
  ano!: string;
  mes!: string;
  hora:any;
 
  constructor( private clinicaServices:ClinicaService) { }
  
  ngOnInit(): void {
    
    this.cargarClinicas();
    this.getDaysFromDate = (this.mes = moment( new Date()).format('M'), this.ano = moment( new Date()).format('YYYY'))
   
  }

  cargarClinicas(){
      this.clinicaServices.cargarClinicas()
        .subscribe( (clinicas : Clinica[])=>{
           this.clinicas = clinicas;
           
        } )
  }
  
}
