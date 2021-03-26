import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-relative',
  templateUrl: './relative.page.html',
  styleUrls: ['./relative.page.scss'],
})
export class RelativePage implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router);
  }

}
