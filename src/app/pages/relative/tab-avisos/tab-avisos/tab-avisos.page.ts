import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab-avisos',
  templateUrl: './tab-avisos.page.html',
  styleUrls: ['./tab-avisos.page.scss'],
})
export class TabAvisosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  //Método para activar el fab de notificaciones
  async openComponent() {
    this.router.navigateByUrl(`notifications-add`,);
  }

}
