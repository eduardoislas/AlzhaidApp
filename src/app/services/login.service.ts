import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootLogin } from '../interfaces/users';

const url = 'http://localhost:3000/login';
//const url = 'https://alzaid.herokuapp.com/login';
// const url = 'http://74.208.247.106:3000/login';


@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) { }

  /**
   * Método POST que envía los datos del usuario para realizar el inicio
   * de sesión. Estos datos son obtenidos de login.page.ts
   * @param name 
   * @param password 
   */
  login(name: string, password: string) {
    return this.http.post<RootLogin>(`${url}`, {
      name,
      password
    });
  }
}
