import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-hygiene',
  templateUrl: './hygiene.page.html',
  styleUrls: ['./hygiene.page.scss'],
})
export class HygienePage implements OnInit {
  usuarioCoordinador = 'false';


  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get("UsuarioCoordinador").then(res => {
      this.usuarioCoordinador = res;
    });
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router, this.storage);
  }

}
