import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-physio',
  templateUrl: './physio.page.html',
  styleUrls: ['./physio.page.scss'],
})
export class PhysioPage implements OnInit {
  usuarioCoordinador = 'false';


  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.storage.get("UsuarioCoordinador").then(res => {
      this.usuarioCoordinador = res;
    });
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router);
  }

}
