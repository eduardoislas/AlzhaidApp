import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-nursery',
  templateUrl: './nursery.page.html',
  styleUrls: ['./nursery.page.scss'],
})
export class NurseryPage implements OnInit {
  usuarioCoordinador = 'false';

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.storage.get("UsuarioCoordinador").then(res => {
      this.usuarioCoordinador = res;
    });
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router, this.storage);
  }
}
