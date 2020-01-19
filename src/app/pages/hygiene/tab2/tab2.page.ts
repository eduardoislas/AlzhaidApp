import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  busqueda;
  fase = 'inicial';
  
  constructor() { }

  ngOnInit() {
  }

  segmentChangedRegistros( event ) {
    console.log(event);
  }

  eventListener( data: string ) {
    this.busqueda = data[0];
    this.fase = data[1];

    console.log(this.busqueda, this.fase);
  }

  numeroRange( event ) {
    console.log(event.detail.value);
  }

}
