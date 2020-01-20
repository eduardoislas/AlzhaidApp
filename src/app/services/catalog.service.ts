import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootCatalog } from "../interfaces/catalogs";

const url = 'http://alzaid.herokuapp.com/catalog/';
// const url = 'http://192.168.0.12:3000//catalog/';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor( private http: HttpClient ) { }

  /*
    Método GET que obtiene todos los catálogos activos. 
  */
  getCatalogs() {
    return this.http.get<RootCatalog>( url );
  }
  /* 
    Método GET que obtiene todos los catálogos activos por tipo.
  */
  getCatalogsType( type: string ) {
    return this.http.get<RootCatalog>( url + type );
  }
  /* 
    Método POST que agrega un nuevo catálogo a la base de datos.
  */
  postCatalog( name, type ) {
    return this.http.post( url, {
      name,
      type
    });
  }
  /* 
    Método DELETE que inactiva un catálogo sin eliminarlo de la base de datos.
  */
  deleteCatalog( id: string ) {
    return this.http.delete( url + id );
  }
}
