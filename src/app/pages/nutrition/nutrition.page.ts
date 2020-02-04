import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.page.html',
  styleUrls: ['./nutrition.page.scss'],
})
export class NutritionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion(){
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "La sesión con este usuario se cerrará.",
      icon: 'warning',
      backdrop: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, adelante!'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl( '' );
      }
    })
  }
}
