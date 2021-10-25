import { Component} from '@angular/core';


@Component({
  selector: 'app-progress',
  templateUrl:'./progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {

  progreso:  number = 1;
  progresob: number = 1;
  
  get getProgreso()  {
   return `${ this.progreso }%`;
    
 }

  get getProgresob() {
   return `${ this.progresob }%`;
  }

  
}
