import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-physio',
  templateUrl: './physio.page.html',
  styleUrls: ['./physio.page.scss'],
})
export class PhysioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router);
  }

}
