import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  RootDaily,
  Dr,
  RootDailyDesempeno,
  RootDailyProgram,
  RootPhysio
} from "../interfaces/daily-records";

const url = 'http://localhost:3000/dailyRecord/';
//const url = 'https://alzaid.herokuapp.com/dailyRecord/';
// const url = 'http://74.208.247.106:3000/dailyRecord/';

@Injectable({
  providedIn: "root"
})
export class DailyRecordService {
  constructor(private http: HttpClient) { }

  /**
   * Método GET que obtiene todos los registros diarios.
   */
  getDailyRecords() {
    return this.http.get<RootDaily>(`${url}`);
  }
  /**
   * Método GET que obtiene todos los registros diarios por paciente
   * @param id 
   */
  getDailyRercodsPatient(id: any) {
    return this.http.get(`${url}patient/${id}`);
  }
  /**
   * Método GET que obtiene todos los registros diarios del día de un paciente 
   * @param id
  */
  getDailyRecordTodayPatient(id: any) {
    return this.http.get<RootDaily>(`${url}today/id/${id}`);
  }
  /**
   * Método GET que obtiene todos los registros diarios del día.
   */
  getDailyRecordsToday() {
    return this.http.get<RootDaily>(`${url}today`);
  }
  /**
   * Método GET que obtiene todos los registros diarios por fecha.
   * @param date 
   */
  getDailyRecordsDate(date: string) {
    return this.http.get<RootDaily>(`${url}date/${date}`);
  }
  /**
   * Método GET que obtiene todos los registros diarios por fecha.
   */
  getDailyRecordsActivities() {
    return this.http.get<RootDailyDesempeno>(`${url}dp/dailyProgram`);
  }
  /**
   * Método GET que obtiene todos los Programas diarios filtrados por fase.
   * @param phase 
   */
  getDailyProgramPhase(phase: string) {
    return this.http.get<RootDailyProgram>(`${url}dp/dailyProgram/${phase}`);
  }
  /**
   * Método POST que registra la asistencia de un paciente.
   * @param id 
   */
  postDailyRecords(id: string) {
    return this.http.post<Dr>(`${url}${id}`, {
      id
    });
  }
  /**
   * Método POST que registra un programa diario.
   * @param dailyprogram 
   */
  postDailyProgram(dailyprogram: any) {
    return this.http.post(`${url}dp/dailyProgram`, dailyprogram);
  }
  /**
   * Método PUT que registra la salida de un paciente.
   * @param id 
   */
  putExitDailyRecords(id: string) {
    return this.http.put(`${url}exit/${id}`, false);
  }
  /**
   * Método PUT que registra la hora de salida de un paciente.
   * @param id 
   */
  putDailyRecords(id: any) {
    return this.http.put(`${url}${id}`, {
      id
    });
  }
  /**
   * Método PUT que actuliza los signos vitales en Daily Records.
   * @param id 
   * @param vitalSigns 
   */
  putVitalDailyRecords(id: string, vitalSigns) {
    return this.http.put<RootPhysio>(`${url}vitalSign/${id}`, {
      vitalSigns
    });
  }
  /**
   * Método PUT que agrega registros de comportamiento en Daily Records.
   * @param id 
   * @param behaviors 
   */
  putBehaviorDailyRecords(id: string, behaviors) {
    return this.http.put<RootPhysio>(`${url}behavior/${id}`, {
      behaviors
    });
  }
  /**
   * Método PUT que agrega las actividades de una persona a su daily Record.
   * @param id 
   * @param phaseBinnacle 
   */
  putDailyRecordActivities(id: string, phaseBinnacle) {
    return this.http.put(`${url}phase/${id}`, {
      phaseBinnacle
    });
  }
  /**
   * Método PUT que agrega las actividades de Physio.
   * @param id 
   * @param physioBinnacle 
   */
  putDailyRecordsPhysio(id: string, physioBinnacle) {
    return this.http.put<RootPhysio>(`${url}physio/${id}`, {
      physioBinnacle
    });
  }

  /**
   * Método PUT que agrega las incidencias de higiene al DR.
   * @param id 
   * @param hygiene 
   */
  putDailyRecordsHygiene(id: string, hygiene) {
    return this.http.put(`${url}hygiene/${id}`, {
      hygiene
    });
  }
  /**
   * Método PUT que agrega el arreglo de activación física al DR.
   * @param activation 
   */
  putDailyRecordsPhysicalActivation(activation) {
    return this.http.put<RootPhysio>(`${url}physio/activation/todos`, {
      activation
    });
  }
  /**
   * Método PUT que agrega el objeto de comida al DR del paciente.
   * @param meal arreglo de comidas.
   * @param id ID del daily Record del paciente.
   */
  putDailyRecordsMeal(meal, id) {
    return this.http.put<RootPhysio>(`${url}meal/${id}`, {
      meal
    });
  }
  /**
   * 
   * @param collation 
   */
  putDailyRecordsCollation(collation) {
    return this.http.put<RootPhysio>(`${url}meal/collation/todos`, {
      collation
    });
  }

}
