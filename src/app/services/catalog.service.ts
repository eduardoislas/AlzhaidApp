import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootCatalog } from "../interfaces/catalogs";

const url = 'http://localhost:3000/catalog/';
//const url = 'https://alzaid.herokuapp.com/catalog/';
// const url = 'http://74.208.247.106:3000/catalog/';

@Injectable({
  providedIn: "root"
})
export class CatalogService {
  constructor( private http: HttpClient ) {}

  /**
   * Método GET que obtiene todos los catálogos activos. 
   */
  getCatalogs() {
    return this.http.get<RootCatalog>(`${url}`);
  }
  /**
   * Método GET que obtiene todos los catálogos activos por tipo.
   * @param type 
   */
  getCatalogsType(type: string) {
    return this.http.get<RootCatalog>(`${url}${type}`);
  }
  /**
   * Método POST que agrega un nuevo catálogo a la base de datos.
   * @param name 
   * @param type 
   */
  postCatalog(name, type) {
    return this.http.post(`${url}`, {
      name,
      type
    });
  }
  /**
   * Método DELETE que inactiva un catálogo sin eliminarlo de la base de datos.
   * @param id 
   */
  deleteCatalog(id: string) {
    return this.http.delete(`${url}${id}`);
  }
}
