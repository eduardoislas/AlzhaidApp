import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootCaregiver } from "../interfaces/caregiver";

const url = "http://localhost:3000/caregiver/";
//const url = 'https://alzaid.herokuapp.com/catalog/';
// const url = 'http://74.208.247.106:3000/catalog/';

@Injectable({
  providedIn: "root",
})
export class CaregiverService {
  constructor(private http: HttpClient) {}

  /**
   * Método GET que obtiene un caregiver segun el ID de un user.
   */
  getCaregiverByUserID(_id: string) {
    return this.http.get<RootCaregiver>(`${url}user/${_id}`);
  }
}