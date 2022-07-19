import { Component } from '@angular/core';
import { MenusidebarService } from 'src/app/services/menusidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {
  
  public menuItems: any[];
  public imgUrl = '';
  public nomB ='';
  public corrE = ''; 
 

  constructor( private menusidebarservice :MenusidebarService,
               private usuarioService: UsuarioService) {
    this.menuItems = menusidebarservice.menu;
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.nomB = usuarioService.usuario.nombre;
    this.corrE = usuarioService.usuario.email;
    
    //console.log(this.menuItems);
   }
logout(){
this.usuarioService.logout();
}


}
