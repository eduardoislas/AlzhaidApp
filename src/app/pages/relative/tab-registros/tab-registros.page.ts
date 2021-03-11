import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../../services/patients.service';
import { AlertController } from '@ionic/angular';
import { DailyRecordService } from '../../../services/daily-record.service';
import { RootDaily, Dr } from '../../../interfaces/daily-records';

@Component({
  selector: 'app-tab-registros',
  templateUrl: './tab-registros.page.html',
  styleUrls: ['./tab-registros.page.scss'],
})
export class TabRegistrosPage implements OnInit {

  patients = [];
  selectedInfo = 'general';
  fechaSeleccionada;
  pacienteSeleccionado;
  dailyRecordsPaciente: Dr[] = [];
  dailyRecordSeleccionado;
  fecha;
  horaEntrada;
  horaSalida;

  constructor(
    private patientService: PatientsService,
    private alertCtrl: AlertController,
    private dailyService: DailyRecordService,
  ) { }

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes(){
    let patientsArray = [];

    this.patientService.getPatients().subscribe(resPatient => {
      resPatient.patients.forEach(patient => {
        patientsArray.push(patient);
      });

      this.patients = patientsArray;
    });
  }

  segmentChangedRegistros( event ){
    this.selectedInfo = event.detail.value;
  }

  dateChanged( event ){
    let fechaAux = new Date(Date.parse(event.detail.value));
    let horasRestar = 1000 * 60 * 60 * 7;
    let nuevaFecha = fechaAux.getTime() - horasRestar;
    fechaAux = new Date(nuevaFecha);
    fechaAux.setUTCHours(0,0,0,0);  

    for(let i=0; i< this.dailyRecordsPaciente.length; i++){
      if(JSON.stringify(this.dailyRecordsPaciente[i].date) == JSON.stringify(fechaAux)){
        this.dailyRecordSeleccionado = this.dailyRecordsPaciente[i];

        console.log(fechaAux);
        this.fecha = fechaAux.getUTCDay()+'/'+fechaAux.getUTCMonth()+'/'+fechaAux.getUTCFullYear();
        //this.horaEntrada = this.dailyRecordSeleccionado.enterHour.substring(15,20);
        
        if(!this.dailyRecordSeleccionado.enterHour == undefined){
          this.horaEntrada = this.dailyRecordSeleccionado.enterHour.substring(15,20);
        }

        if(!this.dailyRecordSeleccionado.exitHour == undefined){
          this.horaSalida = this.dailyRecordSeleccionado.exitHour.substring(15,20);
        }
      }
    }
  }

  seleccionarPaciente( event ){
    this.pacienteSeleccionado = event;
    console.log(this.pacienteSeleccionado.name);

    this.dailyService.getDailyRercodsPatient(this.pacienteSeleccionado._id).subscribe(resDRs => {
      let dailyRecords = (resDRs as RootDaily).drs;
      this.dailyRecordsPaciente = dailyRecords;
      console.log(this.dailyRecordsPaciente);
    });
  }

}
