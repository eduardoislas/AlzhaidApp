import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { VitalSign } from 'src/app/interfaces/daily-records';

@Component({
  selector: 'app-nursery-modal',
  templateUrl: './nursery-modal.page.html',
  styleUrls: ['./nursery-modal.page.scss'],
})
export class NurseryModalPage implements OnInit {
  @Input() paciente;
  
  togglePresion = false;
  toggleFrecuencia = false;
  toggleSaturacion = false;
  toggleGlucosa = false;

  presionA;
  presionB;
  latidos;
  oxigeno;
  glucosa;

  today;
  
  info = [];
  
  constructor( private modalCtrl: ModalController,
               private dailyService: DailyRecordService ) { }

  ngOnInit() { 
    this.today = new Date().toISOString();
  }

  
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  salirConArgumentos() {
    if( this.togglePresion === true ) this.getPresionValues();
    if( this.toggleFrecuencia === true ) this.getFrecuenciaValues();
    if( this.toggleGlucosa === true ) this.getGlucosaValues();
    if( this.toggleSaturacion === true ) this.getSaturacionValues();
    
    this.dailyService.putVitalDailyRecords( this.paciente._id, this.info).subscribe(res => {
      console.log('respuesta', res);
    }, err => {
      console.log('error', err);
    });

    this.modalCtrl.dismiss();
  }
  /* 
    Método que prepara los datos de Presion Arterial para 
    posteriormente agregarlos al arreglo de información.
  */
  getPresionValues() {
    let data: VitalSign = {
      vitalSign: 'Presion arterial',
      date: this.today,
      value: this.presionA,
      valueB: this.presionB
    };
    this.info.push(data);
  }
  /* 
    Método que prepara los datos de Frecuencia cardiaca para 
    posteriormente agregarlos al arreglo de información.
  */
  getFrecuenciaValues() {
    let data: VitalSign = {
      vitalSign: 'Frecuencia cardiaca',
      date: this.today,
      value: this.latidos
    };
    this.info.push(data);
  }
  /* 
    Método que prepara los datos de saturación para posteriormente
    agregarlos al arreglo de información.
  */
  getSaturacionValues() {
    let data: VitalSign = {
      vitalSign: 'Saturacion de oxigeno',
      date: this.today,
      value: this.oxigeno
    };
    this.info.push(data);
  }
  /* 
    Método que prepara los datos de glucosa para posteriormente
    agregarlos al arreglo de información.
  */
  getGlucosaValues() {
    let data: VitalSign = {
      vitalSign: 'Glucosa',
      date: this.today,
      value: this.glucosa
    };
    this.info.push(data);
  }
}
