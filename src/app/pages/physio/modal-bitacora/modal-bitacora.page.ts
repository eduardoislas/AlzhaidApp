import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-bitacora',
  templateUrl: './modal-bitacora.page.html',
  styleUrls: ['./modal-bitacora.page.scss'],
})
export class ModalBitacoraPage implements OnInit {
  @Input() paciente;

  constructor() { }

  ngOnInit() {
    console.log(this.paciente);
  }

}
