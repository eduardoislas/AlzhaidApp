import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }

  pacientes = [];

  opcion;

  constructor( private dailyService: DailyRecordService ) { }

  ngOnInit() {
  }

  segmentChangedRegistros( event ) {
    this.opcion = event.detail.value;
    this.getDailyRecords(); 
  }

  getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe( res => {
      res.drs.forEach(element => {
        this.pacientes.push(element);
      });
      console.log(this.pacientes);
    });
  }

  rangeChange( event ) {
    console.log(event.detail.value);
  }

  sendData() {
    let pacientesSeleccionados = [];

    this.pacientes.forEach(element => {
      if( element.selected === true ) {
        pacientesSeleccionados.push({
          id: element._id,
          performance: element.score
        });
      } else {
        pacientesSeleccionados.push({
          id: element._id,
          performance: 5
        });
      }
    });
    console.log(pacientesSeleccionados);
  }
  

}
