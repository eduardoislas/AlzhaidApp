import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const url = 'https://alzaid.herokuapp.com/user/';
// const url = 'http://74.208.247.106:3000/user/';

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  /**
   * Método GET que obtiene todos los usuarios
   */
  getUsers() {
    return this.http.get(`${url}`);
  }
}
