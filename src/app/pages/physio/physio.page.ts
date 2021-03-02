import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physio',
  templateUrl: './physio.page.html',
  styleUrls: ['./physio.page.scss'],
})
export class PhysioPage implements OnInit {

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
