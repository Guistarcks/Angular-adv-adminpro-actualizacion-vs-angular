import { Component, OnInit } from '@angular/core';
import { MenusidebarService } from 'src/app/services/menusidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  
  menuItems: any[];

  constructor( private menusidebarservice :MenusidebarService) {
    this.menuItems = menusidebarservice.menu;
    //console.log(this.menuItems);
   }
   
  ngOnInit(): void {
  }

}
