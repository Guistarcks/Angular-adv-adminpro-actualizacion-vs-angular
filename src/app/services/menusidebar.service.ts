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
      { titulo: 'Main', url:'/' },
      { titulo: 'ProgressBar', url:'progress' },
      { titulo: 'Gráficas', url:'grafica1' },
      { titulo: 'RxJs', url:'rxjs' },
      { titulo: 'Promesas', url:'promesas' },
      
    ]

   },
   {
    titulo: 'Mantenimientos',
    iconos: 'mdi mdi-folder-lock-open',
    submenu:[
      { titulo: 'Usuarios', url:'usuarios' },
      { titulo: 'Clinicas', url:'Clinicas' },
      { titulo: 'Doctores', url:'Doctores' },
      
    ]

   }
  ];

  constructor() { }
}
