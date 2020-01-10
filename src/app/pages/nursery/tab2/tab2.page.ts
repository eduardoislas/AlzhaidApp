import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { AlertController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  today = new Date();
  fecha;

  registro = 'entrada';
  busqueda;
  fase = 'inicial';

  idDaily;

  pacientesEntrada = [];
  pacientesSalida = [];

  constructor( private patientService: PatientsService,
               // private modalCtrl: ModalController,
               private alertCtrl: AlertController,
               private dailyService: DailyRecordService ) { }
  
  ngOnInit() { this.patientsRole( this.fase ); }
  /* 
    Método encargado de escuchar el segundo dato del arreglo proviniente
    del componente de searchbar ( el cual es la fase del paciente) y 
    llamar al método patientsRole.
  */
  eventListener( data: string ) {
    this.registro = data[0];
    this.busqueda = data[1];
    this.fase = data[2];

    switch( this.fase ) {
      case 'inicial':
        this.patientsRole( this.fase );
        break;
      case 'intermedia':
        this.patientsRole( this.fase );
        break;
      case 'avanzada':
        this.patientsRole( this.fase );
        break;
      default:
        break;
    }
  }
  /* 
    Método que obtiene a los pacientes según su fase:
    Inicial, Intermedia o Avanzada.
    Estos pacientes son guardados en el arreglo de pacientes.
  */
  patientsRole( role: string ) {
    // Se limpian los arreglos para agregar los de distintas fases
    this.pacientesEntrada = [];
    this.pacientesSalida = [];

    if(this.registro === 'entrada') {
      // Si registro es igual a entrada, se agregan los pacientes con la
      // fase recibida en el parametro, esto del servicio de obtener
      // pacientes por fase/rol
      this.patientService.getPatientsRole( role ).forEach(res => {
        this.pacientesEntrada.push( ...res.patients );
      });
    } else if(this.registro === 'salida') {
      // Si el registro es igual a salida, se agregan los pacientes a los
      // cuales se les agregó asistencia en el día actual, esto del servicio
      // de dailyRecordsDate.
      this.dailyService.getDailyRecordsDate().subscribe(res => {
        res.drs.forEach(r => {
          if( this.capitalize(this.fase) === r.patient.phase ) {
            debugger;
            this.pacientesSalida.push( ...res.drs );
            console.log(...res.drs);
          }
        });
      });
    }
  }
  /* 
    Método que despliega el método attendanceAlert() en caso que
    se haya seleccionado la opción de Entrada, en caso de querer
    registrar una salida, se llama a departureAlert().
  */
  chooseAlert( id: string ) {
    this.registro === 'entrada' ? this.attendanceAlert( id ) : this.departureAlert( id );
  }
  /* 
    Método que pedirá confirmación del usuario para registrar
    una asistencia a un paciente.
  */
  async attendanceAlert( id: string ) {
    const alert = await this.alertCtrl.create({
      header: 'Registro de entrada',
      message: '¿Está seguro de querer registrar esta entrada?' ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        },
        {
          text: 'Aceptar',
          handler: (blah) => {
            this.dailyService.postDailyRecords( id ).subscribe();
            // for(var i = 0; i < this.pacientesEntrada.length; i++) {
            //   if(this.pacientesEntrada[i]._id === id) this.pacientesEntrada.splice(i, 1);
            // }
          }
        }
      ]
    });
    await alert.present();
  }
  /* 
    Método que pedirá confirmación del usuario para registrar
    una asistencia a un paciente.
  */
  async departureAlert( id: string ) {
    const alert = await this.alertCtrl.create({
      header: 'Registro de Salida',
      message: '¿Está seguro de querer registrar esta salida?' ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log(id);
            // this.dailyService.putExitDailyRecords( id ).subscribe();
          }
        }
      ]
    });
    await alert.present();
  }
  /* 
    Método que sirve para volver mayúscula la primera letra de una palabra
  */
  capitalize( word: string ) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // async openModal( name: string, lastName: string ) {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalComponent,
  //     componentProps: {
  //       name,
  //       lastName,
  //       img: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'
  //     }
  //   });
  //   await modal.present();

  //   const { data } = await modal.onDidDismiss();
  //   console.log( 'Retorno modal', data );

  // }

}
