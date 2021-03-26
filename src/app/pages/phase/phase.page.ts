import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.page.html',
  styleUrls: ['./phase.page.scss'],
})
export class PhasePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router);
  }
}
