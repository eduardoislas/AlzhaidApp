import Swal, { SweetAlertIcon } from "sweetalert2";
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

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
    width: 300,
    background: '#18485e',
    html:
      `<div style="display:flex; justify-content: center; "><img src="../../assets/img/exito.png" style="width:10%;"><div style="color:white; padding-top:2.5%; padding-left:2.5%;" ><b>${msg}</b></div></div> `,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({});
}

export function mostrarAlertaAdvertencia(msg: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    width: 300,
    background: '#18485e',
    html:
      `<div style="display:flex; justify-content: center; "><img src="../../assets/img/alerta.png" style="width:10%;"><div style="color:white; padding-top:2.5%; padding-left:2.5%;" ><b>${msg}</b></div></div> `,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({});
}

export function mostrarAlertaError(msg: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    width: 300,
    background: '#18485e',
    html:
      `<div style="display:flex; justify-content: center; "><img src="../../assets/img/error.png" style="width:10%;"><div style="color:white; padding-top:2.5%; padding-left:2.5%;" ><b>${msg}</b></div></div> `,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({});
}

export function mostrarAlertaCerrarSesion(router: Router, storage: Storage) {
  if (!Swal.isVisible()) {
    Swal.fire({
      html:
        '<div style="color:white;" ><b>¿Desea cerrar sesión?</b></div> ',
      backdrop: false,
      showCancelButton: true,
      confirmButtonColor: '#299736',
      cancelButtonColor: '#C44038',
      confirmButtonText: '<div style="width:75px; ">Confirmar</div>',
      cancelButtonText: '<div style="width:75px; ">Cancelar</div>',
      background: '#18485e',
      padding: 5,
      width: 600,
      imageHeight: 60,
      imageWidth: 60,
      imageUrl: '../../assets/img/cerrarSesion.png',

    }).then((result) => {
      if (result.value) {
        storage.clear();
        router.navigateByUrl('');
      }
    });
  }
}

export function mostrarAlertaGrande(titulo: string, texto: string, icono: SweetAlertIcon, url: string, router: Router) {
  Swal.fire({
    html:
      `<div style="color:white;"><b>${titulo}</b> <br> ${texto}</div> `,
    backdrop: false,
    showCancelButton: true,
    confirmButtonColor: '#299736',
    cancelButtonColor: '#C44038',
    confirmButtonText: '<div style="width:75px; ">Confirmar</div>',
    cancelButtonText: '<div style="width:75px; ">Cancelar</div>',
    background: '#18485e',
    padding: 5,
    width: 600,
    imageHeight: 60,
    imageWidth: 60,
    imageUrl: '../../assets/img/alerta.png',
  }).then((result) => {
    if (!result.value) {
      router.navigateByUrl(url);
    }
  })
}

