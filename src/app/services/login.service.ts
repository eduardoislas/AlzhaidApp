import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  /*
    Método que envía los datos del usuario para realizar el inicio
    de sesión.
    Estos datos son obtenidos de login.page.ts
  */
  login(username:string, password:string) {
    return this.http.post('https://alzaid.herokuapp.com/login', {
      name: username,
      password: password,     
    }); 
  }
}
