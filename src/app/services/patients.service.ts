import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'https://alzaid.herokuapp.com/patient/';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor( private http: HttpClient ) { }

  /* 
    Método GET que obtiene todos los pacientes activos.
  */
  getPatients() {
    return this.http.get( url );
  }
  /* 
    Método POST que agrega un paciente nuevo a la base de datos.
  */
  postPatients( name: string, lastName: string, birthdate: any, 
                lastNameSecond?: string, registerDate?: any, img?: any ) {
    
    return this.http.post( url, {
      name,
      lastName,
      lastNameSecond,
      birthdate,
      registerDate,
      img
    });
  }
  /* 
    Método PUT que actualiza un paciente de la base de datos.
  */
  putPatients( id: string, name: string, lastName: string, birthdate: any, 
               lastNameSecond?: string, registerDate?: any, img?: any ) {
    return this.http.put(url + id, {
      name,
      lastName,
      lastNameSecond,
      birthdate,
      registerDate,
      img
    });
  }
  /* 
    Método DELETE que da de baja un paciente sin eliminarlo de la base de datos.
  */
  deletePatients( id ) {
    return this.http.delete( url + id );
  }
}
