import { Component, OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { User } from "../user/user.module";
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
              private userService: UserService) { }

  ngOnInit() { }

  /*
    Método login que recibe dos parametros, el usuario y contraseña obtenidos
    en el input del HTML (login.page.html) para realizar el Subscribe al servicio 
    de login para obtener los datos de la persona que va a iniciar sesión.
    Dentro del switch se agarra el nombre del rol y se hace un switch para, 
    según el nombre que llega, construir los tabs.
  */
  login(username: string, password: string) {
    
    this.loginService.login(username, password).subscribe((res:any) => {
      
      let u: User = {username: username}
      this.userService.setUserLogged(u);
      
      switch(res.user.role.name) {
        case "ENFERMERIA":
          this.router.navigateByUrl("/nursery-tab");
          break;
        // Anexar aquí los posibles casos existentes
        default:
          break;
      }

    }, err => {
      // Aquí se pondrá un modal o algún aviso con el error correspondiente
      console.log(err.error);
    });
  }
}
