import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootDaily, Dr } from "../interfaces/daily-records";

const url = 'http://alzaid.herokuapp.com/dailyRecord/';
// -const url = 'http://192.168.0.12:3000/dailyRecord/';



@Injectable({
  providedIn: 'root'
})
export class DailyRecordService {

  constructor( private http: HttpClient ) { }

  /* 
    Método GET que obtiene todos los registros diarios.
  */
  getDailyRecords() {
    return this.http.get<RootDaily>( url );
  }
  /* 
    Método GET que obtiene todos los registros diarios por paciente
  */
  getDailyRercodsPatient( id: any ) {
    return this.http.get( url + 'patient/' + id );
  }
  /* 
    Método GET que obtiene todos los registros diarios por fecha.
  */
  getDailyRecordsDate() {
    return this.http.get<RootDaily>( url + 'today' );
  }
  /* 
    Método POST que registra la asistencia de un paciente.
  */
  postDailyRecords( id: string ) {
    return this.http.post<Dr>( url + id , {
      id
    });
  }
  /* 
    Método PUT que registra la salida de un paciente.
  */
  putExitDailyRecords( id: string ) {
    return this.http.put( url + 'exit/' + id, false);
    
  }
  /*
    Método PUT que registra la hora de salida de un paciente.
  */
  putDailyRecords( id: any ) {
    return this.http.put( url + id , {
      id
    });
  }
  /*
    Método PUT que actuliza los signos vitales en Daily Records.
  */
  putVitalDailyRecords( id: string, vitalSigns ) {
    return this.http.put(url + 'vitalSign/' + id, {
      vitalSigns
    })
  }


}
