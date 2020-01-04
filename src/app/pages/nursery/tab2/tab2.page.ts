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
    this.patientService.getPatients().subscribe(res => {
      console.log(res);
      this.pacientes.push( ...res.patients );
    });
  }

  onClick() {
    
  }

}
