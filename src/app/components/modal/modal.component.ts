import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PatientsService } from 'src/app/services/patients.service';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  apoyos = [];
  apoyosPaciente = [];
  
  today = new Date();
  day;
  month;
  year;
  date = this.getDate();

  @Input() nombre;
  @Input() pais;

  constructor( private modalCtrl: ModalController,
               private patientService: PatientsService,
               private catalogService: CatalogService ) { }

  ngOnInit() {
    this.getSupportsByType('apoyo');
    this.getPatientSupports();
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  salirConArgumentos() {
    this.modalCtrl.dismiss({
      nombre: 'Luis Felipe',
      pais: 'México'
    });
  }

  getDate() {
    this.day = this.today.getDate();

    switch( this.today.getMonth() +1 ) {
      case 1:
        this.month = 'enero';
        break;
      case 2:
        this.month = 'febrero';
        break;
      case 3:
        this.month = 'marzo';
        break;
      case 4:
        this.month = 'abril';
        break;
      case 5:
        this.month = 'mayo';
        break;
      case 6:
        this.month = 'junio';
        break;
      case 7:
        this.month = 'julio';
        break;
      case 8:
        this.month = 'agosto';
        break;
      case 9:
        this.month = 'septiembre';
        break;
      case 10:
        this.month = 'octubre';
        break;
      case 11:
        this.month = 'noviembre';
        break;
      case 12:
        this.month = 'diciembre';
        break;
    }
    this.year = this.today.getFullYear();
    
    return this.day + ' de ' + this.month + ' de ' + this.year;
  }

  getSupportsByType( type: string ) {
    this.apoyos = [];
    this.catalogService.getCatalogsType( type ).subscribe(res => {
      this.apoyos.push(...res.catalogs);      
    });
  }
  getPatientSupports(  ) {
    this.apoyosPaciente = [];
    this.patientService.getPatients().subscribe(res => {
      res.patients.forEach(re => {
        re.technicalSupport.forEach(r => {
          this.apoyosPaciente.push(r.name);
        });
      });
    });
  }
}
