import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    //Validar que si ya hay una alerta abierta, no se cree de nuevo
    if (!Swal.isVisible()) {
      Swal.fire({
        title: '¿Cerrar sesión?',
        text: 'La sesión con este usuario se cerrará.',
        icon: 'warning',
        backdrop: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, adelante!'
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('');
        }
      });
    }
  }
}
