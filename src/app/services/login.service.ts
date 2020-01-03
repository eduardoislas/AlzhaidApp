import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'https://alzaid.herokuapp.com/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }
  /*
    Método POST que envía los datos del usuario para realizar el inicio
    de sesión.
    Estos datos son obtenidos de login.page.ts
  */
  login( name: string, password: string ) {
    return this.http.post( url, {
      name,
      password,
    }); 
  }
}
