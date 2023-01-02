import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenusidebarService {

  menu: any[] =[
   {
    titulo: 'Menu-Principal',
    iconos: 'mdi mdi-gauge',
    submenu:[
      { titulo: 'Inicio', url:'/' },
      { titulo: 'Gestión paciente', url:'clientes' },
      { titulo: 'Programar citas', url:'citas' },
      //{ titulo: 'ProgressBar', url:'progress' },
     // { titulo: 'Gráficas', url:'grafica1' },
     // { titulo: 'RxJs', url:'rxjs' },
     // { titulo: 'Promesas', url:'promesas' },
      
    ]

   },
   {
    titulo: 'Mantenimientos',
    iconos: 'mdi mdi-folder-lock-open',
    submenu:[
      { titulo: 'Usuarios', url:'usuarios' },
      { titulo: 'Clinicas', url:'clinicas' },
      { titulo: 'Doctores', url:'doctores' },
     
    ]

   }
  ];

  constructor() { }
}
