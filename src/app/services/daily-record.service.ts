import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  RootDaily,
  Dr,
  RootDailyDesempeno,
  RootDailyProgram
} from "../interfaces/daily-records";

const url = "https:/alzaid.herokuapp.com/dailyRecord/";
// const url = 'http://192.168.0.12:3000/dailyRecord/';

@Injectable({
  providedIn: "root"
})
export class DailyRecordService {
  constructor(private http: HttpClient) {}

  /* 
    Método GET que obtiene todos los registros diarios.
  */
  getDailyRecords() {
    return this.http.get<RootDaily>(`${url}`);
  }
  /* 
    Método GET que obtiene todos los registros diarios por paciente
  */
  getDailyRercodsPatient(id: any) {
    return this.http.get(`${url}patient/${id}`);
  }
  /* 
    Método GET que obtiene todos los registros diarios del día.
  */
  getDailyRecordsToday() {
    return this.http.get<RootDaily>(`${url}today`);
  }
  /*
    Método GET que obtiene todos los registros diarios por fecha.
  */
  getDailyRecordsDate(date: string) {
    return this.http.get<RootDaily>(`${url}date/${date}`);
  }
  /* 
    Método GET que obtiene todos los registros diarios por fecha.
  */
  getDailyRecordsActivities() {
    return this.http.get<RootDailyDesempeno>(`${url}dp/dailyProgram`);
  }
  /* 
    Método GET que obtiene todos los Programas diarios filtrados por fase.
  */
  getDailyProgramPhase(phase: string) {
    return this.http.get<RootDailyProgram>(`${url}dp/dailyProgram/${phase}`);
  }
  /* 
    Método POST que registra la asistencia de un paciente.
  */
  postDailyRecords(id: string) {
    return this.http.post<Dr>(`${url}${id}`, {
      id
    });
  }
  /* 
    Método POST que registra un programa diario.
  */
  postDailyProgram(dailyprogram: any) {
    return this.http.post(`${url}dp/dailyProgram`, dailyprogram);
  }
  /* 
    Método PUT que registra la salida de un paciente.
  */
  putExitDailyRecords(id: string) {
    return this.http.put(`${url}exit/${id}`, false);
  }
  /*
    Método PUT que registra la hora de salida de un paciente.
  */
  putDailyRecords(id: any) {
    return this.http.put(`${url}${id}`, {
      id
    });
  }
  /*
    Método PUT que actuliza los signos vitales en Daily Records.
  */
  putVitalDailyRecords(id: string, vitalSigns) {
    return this.http.put(`${url}vitalSign/${id}`, {
      vitalSigns
    });
  }
  /* 
    Método PUT que agrega registros de actitudes en Daily Records.
  */

  putAttitudeDailyRecords(id: string, attitudes) {
    return this.http.put(`${url}attitude/${id}`, {
      attitudes
    });
  }
  /* 
    Método PUT que agrega registros de comportamiento en Daily Records.
  */

  putBehaviorDailyRecords(id: string, behaviors) {
    return this.http.put(`${url}behavior/${id}`, {
      behaviors
    });
  }
  /* 
    Método PUT que agrega registros de Crisis en Daily Records.
  */

  putCrisisDailyRecords(id: string, crisis) {
    return this.http.put(`${url}crisis/${id}`, {
      crisis
    });
  }
  /*
    Método PUT que agrega las actividades de una persona a su daily Record.
  */
  putDailyRecordActivities(id: string, phaseBinnacle) {
    return this.http.put(`${url}phase/${id}`, {
      phaseBinnacle
    });
  }
  /*
    Método PUT que agrega las actividades de Physio
  */
  putDailyRecordsPhysio(id: string, physioBinnacle) {
    return this.http.put(`${url}physio/${id}`, {
      physioBinnacle
    });
  }
}
