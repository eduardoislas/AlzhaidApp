import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() { }

  redireccionar(nuevoRol) {
    this.storage.set('Rol', nuevoRol);
    switch (nuevoRol) {
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
    }
  }

}
