import Swal, { SweetAlertIcon } from "sweetalert2";
import { Router } from '@angular/router';

export function mostrarAlerta(
  msg: string,
  icon: SweetAlertIcon,
  botonConfirmacion: boolean,
  time: number
) {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: botonConfirmacion,
    timer: time,
    timerProgressBar: true,

    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: msg,
  });
}

export function mostrarAlertaConfirmacion(msg: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,

    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: msg,
  });
}

export function mostrarAlertaAdvertencia(msg: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
  
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  
    Toast.fire({
      icon: "warning",
      title: msg,
    });
  }

  export function mostrarAlertaCerrarSesion(router: Router){
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
            router.navigateByUrl('');
          }
        });
      }
  }

  export function mostrarAlertaGrande(titulo: string, texto: string, icono: SweetAlertIcon, url: string){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        backdrop: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, adelante!'
      }).then((result) => {
        if (!result.value) {
          this.router.navigateByUrl(url);
        }
      })
  }
  
  export function mostrarAlertaError(titulo: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: titulo
    });
  }