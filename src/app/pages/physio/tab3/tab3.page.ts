import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  busqueda;
  fase = 'inicial';
  constructor() { }

  ngOnInit() {
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
