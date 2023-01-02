import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes.model';
import { Clinica } from 'src/app/models/clinicas.model';

@Component({
  selector: 'app-modal-actualizarclientes',
  templateUrl: './modal-actualizarclientes.component.html',
  styles: [
  ]
})
export class ModalActualizarclientesComponent implements OnInit {
  public clinicas:Cliente[] = [];
  constructor() { }
  
  ngOnInit(): void {
  }

  
}
