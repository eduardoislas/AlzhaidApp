import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootPatient, RPatient } from '../interfaces/patients';

const url = 'http://localhost:3000/patient/';
//const url = 'https://alzaid.herokuapp.com/patient/';
// const url = 'http://74.208.247.106:3000/patient/'

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  /**
   * Método GET que obtiene todos los pacientes activos.
   */
  getPatients() {
    return this.http.get<RootPatient>(`${url}`);
  }
  /**
   * Método GET que obtiene todos los pacientes activos por fase.
   * @param role 
   */
  getPatientsRole(role: string) {
    return this.http.get<RootPatient>(`${url}${role}`);
  }
  /**
   * Metodo GET que obtiene RPatient por id
   * @param id 
   */
  getPatientId(id: string) {
    return this.http.get<RPatient>(`${url}id/${id}`);
  }
  /**
   * 
   * @param id 
   * @param assistance 
   */
  putPatientAssistance(id: string, assistance: boolean) {
    return this.http.put(`${url}assistance/${id}`, {
      assistance
    });
  }
}
