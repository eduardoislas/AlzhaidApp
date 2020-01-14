import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url: string = 'https://alzaid.herokuapp.com/catalog/';
// -const url: string = 'http://192.168.0.12:3000/catalog/';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
  constructor( private http: HttpClient ) { }

  /*
    Método GET que obtiene todos los catálogos activos.
   */
  getActiveCatalogs() {
    return this.http.get( url );
  }
  /*
    Método GET que obtiene todos los catálogos por tipo.
  */
  getRoles( tipo: any ) {
    return this.http.get( url + tipo ); 
  }
  /*
    Método POST que agrega un nuevo catálogo a la base de datos.
   */
  postRoles( name: string, type: string ) {
    return this.http.post( url, {
      name,
      type
    });
  }
  /*
    Método DELETE que inactiva un catálogo sin eliminarlo de la base de datos.
  */
  deleteRoles( id: any ) {
    return this.http.delete( url + id );
  }
}
