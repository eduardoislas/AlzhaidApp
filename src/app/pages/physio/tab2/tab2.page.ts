import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  opcion;

  busqueda;
  fase = 'inicial';
  constructor() { }

  ngOnInit() {
  }

  segmentChangedRegistros( event ) {
    this.opcion = event.detail.value;
    console.log(this.opcion);
    switch( this.opcion ) {
      case 'programaDiario':
        break;
      case 'reporteDesempeno':
        break;
      default:
        break;
    }
  }
  eventListener( data: string ) {
    this.busqueda = data[0];
    this.fase = data[1];

    console.log(this.busqueda, this.fase);
  }

}
