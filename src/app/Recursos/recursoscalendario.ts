//import { Component, OnInit } from '@angular/core';
//import * as moment from 'moment'
//@Component({
//  selector: 'app-citas',
//  templateUrl: './',
//  styles: [
//  ]
//})
//export class CitasComponent implements OnInit {
//  week: any = [
//    "Lunes",
//    "Martes",
//    "Miercoles",
//    "Jueves",
//    "Viernes",
//    "Sabado",
//    "Domingo"
//  ];
//  monthSelect!: any[];
//  dateSelect: any;
//  dateValue: any;
//  
//  ano!: string;
//  mes!: string;
//
//  hora:any;
//  constructor() { }
//  
//  ngOnInit(): void {
//    
//    this.getDaysFromDate(this.mes = moment( new Date()).format('M'), this.ano = moment( new Date()).format('YYYY'))
//  }
//  getDaysFromDate(month:any, year:any) {
//
//    const startDate = moment.utc(`${year}/${month}/01`)
//    const endDate = startDate.clone().endOf('month')
//    this.dateSelect = startDate;
//
//    const diffDays = endDate.diff(startDate, 'days', true)
//    const numberDays = Math.round(diffDays);
//
//    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
//      a = parseInt(a) + 1;
//      const dayObject = moment(`${year}-${month}-${a}`);
//      return {
//        name: dayObject.format("dddd"),
//        value: a,
//        indexWeek: dayObject.isoWeekday()
//      };
//    });
//
//    this.monthSelect = arrayDays;
//  }
//  changeMonth( flag:any ) {
//    if (flag < 0) {
//      const prevDate = this.dateSelect.clone().subtract(1, "month");
//      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
//    } else {
//      const nextDate = this.dateSelect.clone().add(1, "month");
//      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
//    }
//  }
//  
//  clickDay(day:any) {
//    const monthYear = this.dateSelect.format('YYYY-MM')
//    const parse = `${monthYear}-${day.value}`
//    const objectDate = moment(parse)
//    this.dateValue = objectDate;
//
//
//  }
//}
//