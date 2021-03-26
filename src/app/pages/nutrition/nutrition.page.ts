import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mostrarAlertaCerrarSesion } from '../../helpers/alert-helper';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.page.html',
  styleUrls: ['./nutrition.page.scss'],
})
export class NutritionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    mostrarAlertaCerrarSesion(this.router);
  }
}
