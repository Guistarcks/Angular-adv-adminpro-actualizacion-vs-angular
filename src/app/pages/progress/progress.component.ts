import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  template: `
    <p>
      progress works!
    </p>
  `,
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
