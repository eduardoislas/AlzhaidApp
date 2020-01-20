import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from "../interfaces/users";

const url = 'http://alzaid.herokuapp.com/user/';
// const url = 'http://192.168.0.12:3000//user/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  /* 
    Método GET que obtiene todos los usuarios
  */
  getUsers() {
    return this.http.get( url );
  }
  /* 
    Método POST que agrega un usuario nuevo a la base de datos.
  */
  postUsers( name: string, password: string, role?: string ) {
    return this.http.post<Users>( url, {
      name,
      password,
      role
    });
  }
  /* 
    Método PUT que actualiza un usuario de la base de datos.
  */
  putUsers( id: string, password: string, role: string ) {
    return this.http.put<Users>( url, {
      password,
      role
    });
  }
  /* 
    Método DELETE que da de baja un paciente sin eliminarlo de la base de datos.
  */
  deleteUsers( id: string ) {
    return this.http.delete( url + id );
  }
}
