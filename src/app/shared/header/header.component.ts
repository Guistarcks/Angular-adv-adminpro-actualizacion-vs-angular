import { Component  } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

public imgUrl = '';
public nomB ='';
public corrE = ''; 

constructor(private usuarioService: UsuarioService) {

this.imgUrl = usuarioService.usuario.imagenUrl; 
this.nomB = usuarioService.usuario.nombre;
this.corrE = usuarioService.usuario.email;

 }

 logout(){
  this.usuarioService.logout();
 }

}
