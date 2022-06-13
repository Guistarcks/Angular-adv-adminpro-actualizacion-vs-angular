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
  
  menuItems: any[];

  constructor( private menusidebarservice :MenusidebarService,  private usuarioService: UsuarioService) {
    this.menuItems = menusidebarservice.menu;
    //console.log(this.menuItems);
   }
logout(){
this.usuarioService.logout();
}


}
