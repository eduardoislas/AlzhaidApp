import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }
  /*
    Método GET que obtiene el arreglo de roles existentes.
  */
  getRoles() {
    return this.http.get('https://alzaid.herokuapp.com/catalog/rol'); 
  }
}
