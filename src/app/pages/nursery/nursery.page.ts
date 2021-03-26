import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-nursery',
  templateUrl: './nursery.page.html',
  styleUrls: ['./nursery.page.scss'],
})
export class NurseryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router);
  }
}
