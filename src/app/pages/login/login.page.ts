import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /*
    loginService: Servicio de login que realiza el POST con los datos del
    usuario para iniciar la sesión.
    router: Para realizar un navigate a las distintas paginas de la app.
    userService: Servicio que funciona para mantener la sesión del usuario
    abierta.
  */
  constructor(private loginService: LoginService,
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.clear();
  }

  /*
    Método login que recibe dos parametros, el usuario y contraseña obtenidos
    en el input del HTML (login.page.html) para realizar el Subscribe al servicio 
    de login para obtener los datos de la persona que va a iniciar sesión.
    Dentro del switch se agarra el nombre del rol y se hace un switch para, 
    según el nombre que llega, construir los tabs.
  */
  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe((res: any) => {
      let user: User = res.user;

      if (user.role == 'COORDINADOR') { //Si el usuario tiene rol de COORDINADOR, se le asigna el rol de ENFERMERIA por defecto
        this.storage.set('Rol', 'ENFERMERIA');
        this.storage.set('UsuarioCoordinador', 'true');//Se crea un nuevo key/value para identificar que el usuario es coordinador
      } else {
        this.storage.set('Rol', user.role);
        this.storage.set('UsuarioCoordinador', 'false');
      }

      this.storage.set('username', user.name);
      this.storage.set('id', user._id);

      switch (user.role) {
        case 'FASE_INICIAL':
          this.router.navigateByUrl('/phase');
          break;
        case 'FASE_INTERMEDIA':
          this.router.navigateByUrl('/phase');
          break;
        case 'FASE_AVANZADA':
          this.router.navigateByUrl('/phase');
          break;
        case 'FISIOTERAPIA':
          this.router.navigateByUrl('/physio');
          break;
        case 'HIGIENE':
          this.router.navigateByUrl('/hygiene');
          break;
        case 'NUTRICION':
          this.router.navigateByUrl('/nutrition');
          break;
        case 'ENFERMERIA':
          this.router.navigateByUrl('/nursery');
          break;
        case 'FAMILIAR':
          this.router.navigateByUrl('/relative');
          break;
        case 'COORDINADOR':
          this.router.navigateByUrl('/nursery');//Si el usuario es coordinador, se le reenvia a la pantalla de enfermeria por defecto
          break;
      }

    }, err => {
      if (err) {
        this.presentAlert(err.error.err.message);
      } else {
        this.presentAlert();
      }
    });
  }

  /* 
    Método que despliega un mensaje de error, siendo este
    el que regresa el método de login()
  */
  async presentAlert(message?: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error.',
      subHeader: 'No pudo iniciar sesión.',
      message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            return;
          }
        }
      ]
    });
    await alert.present();
  }

}
