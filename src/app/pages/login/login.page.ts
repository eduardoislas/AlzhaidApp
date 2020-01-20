import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }
  /*
    loginService: Servicio de login que realiza el POST con los datos del
    usuario para iniciar la sesión.
    router: Para realizar un navigate a las distintas paginas de la app.
    userService: Servicio que funciona para mantener la sesión del usuario
    abierta.
  */
  constructor( private loginService: LoginService,
               private router: Router,
               private alertCtrl: AlertController,
               private storage: Storage ) { }

  ngOnInit() { }

  /*
    Método login que recibe dos parametros, el usuario y contraseña obtenidos
    en el input del HTML (login.page.html) para realizar el Subscribe al servicio 
    de login para obtener los datos de la persona que va a iniciar sesión.
    Dentro del switch se agarra el nombre del rol y se hace un switch para, 
    según el nombre que llega, construir los tabs.
  */
  login( username: string, password: string ) {
    this.loginService.login( username, password ).subscribe(( res: any ) => {
      switch( res.user.role ) {

        case 'FASE_INICIAL' || 'FASE_INTERMEDIA' || 'FASE_AVANZADA':
          this.storage.set('Rol', res.user.role);
          this.router.navigateByUrl( '/phase' );
          break;
        case 'FISIOTERAPIA':
          this.router.navigateByUrl( '/physio' );
          break;
        case 'HIGIENE':
          this.router.navigateByUrl( '/hygiene' );
          break;
        case 'NUTRICION':
          this.router.navigateByUrl( '/nutrition' );
          break;
        case 'ENFERMERIA':
          this.router.navigateByUrl( '/nursery' );
          break;
      }

    }, err => {
      this.presentAlert( err.error.err.message );
    });
  }

  /* 
    Método que despliega un mensaje de error, siendo este
    el que regresa el método de login()
  */
  async presentAlert( message: string ) {
    const alert = await this.alertCtrl.create({
      header: 'Error.',
      subHeader: 'No pudo iniciar sesión.',
      message,
      buttons: [
        {
            text: 'Aceptar',
            handler: (blah) => {
              return;
          }
        }
      ]
    });
    await alert.present();
  }

}
