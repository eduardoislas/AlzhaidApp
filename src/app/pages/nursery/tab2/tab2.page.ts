import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pacientes = [];

  constructor( private patientService: PatientsService ) { }
  
  ngOnInit() {
    this.patientsRole( 'inicial' );

  }
  eventListener( data: string ) {
    switch( data[2] ) {
      case 'inicial':
        this.patientsRole( data[2] );
        break;
      case 'intermedia':
        this.patientsRole( data[2] );
        break;
      case 'avanzada':
        this.patientsRole( data[2] );
        break;
      default:
        break;
    }
  }
  patientsRole( role: string ) {
    this.pacientes = [];
    this.patientService.getPatientsRole( role ).forEach(res => {
      this.pacientes.push( ...res.patients );
    });
  }

}
