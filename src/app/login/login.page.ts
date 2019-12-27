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

  constructor(private loginService: LoginService, 
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    
  }


  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe(res => {
      let u:User = {username: username}
      this.userService.setUserLogged(u);
      console.log(res);

    }, err => {
      console.log(err.error);
    }, 

    () => this.navigate()

    );
  }

  navigate() {
    this.router.navigateByUrl('/nursery-tab');
  }

}
