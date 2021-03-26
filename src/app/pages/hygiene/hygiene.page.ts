import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-hygiene',
  templateUrl: './hygiene.page.html',
  styleUrls: ['./hygiene.page.scss'],
})
export class HygienePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion(){
    mostrarAlertaCerrarSesion(this.router);
  }

}
