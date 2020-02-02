import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController, IonRange } from "@ionic/angular";
import { CatalogService } from "src/app/services/catalog.service";
import { DailyRecordService } from "src/app/services/daily-record.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-phase-modal",
  templateUrl: "./phase-modal.page.html",
  styleUrls: ["./phase-modal.page.scss"]
})
export class PhaseModalPage implements OnInit {
  @ViewChild(IonRange, { static: true }) iRange: IonRange;

  @Input() paciente;
  @Input() tipoBitacora;

  tiempoSeleccionado;
  crisisSeleccionada;
  valorRange;
  observation;

  toggleConducta = true;

  catalogoConductas = [];
  infoConductas = [];

  constructor(
    private modalCtrl: ModalController,
    private catalogService: CatalogService,
    private dailyService: DailyRecordService
  ) {}

  ngOnInit() {
    this.getCatalogs(this.tipoBitacora);
  }

  /*
    Método que obtiene el momento del día seleccionado
    (Mañana o Tarde) en el Phase-Modal.
  */
  timeOfDay(time) {
    this.tiempoSeleccionado = time.detail.value;
  }
  /*
    Método que obtiene los valores de los ion range de los
    comportamientos o conductas seleccionados en el Phase-Modal.
  */
  activityScore(score) {
    this.valorRange = score.detail.value;

    console.log("Catalogo Score", this.valorRange);
  }
  /*
    Método que obtiene la crisis seleccionada en el Phase-Modal
    esto en caso que crisis haya sido seleccionado en la bitácora.
  */
  selectedCrisis(crisis) {
    this.crisisSeleccionada = crisis.detail.value;

    console.log(this.crisisSeleccionada);
  }
  /* 
    Método que obtiene las conductas o comportamiento seleccionadas
    en el Modal-Phase.
  */
  selectedActions(action) {
    console.log("name", action);
  }
  /*
    Método que obtiene los catalogos de Conducta, Comportamientos
    o Crisis según el seleccionado en bitácora. Estos utilizan el
    servicio de obtener catalogos por tipo y los guarda en el arreglo
    catalogoConductas.
  */
  getCatalogs(type: string) {
    this.catalogService.getCatalogsType(type).subscribe(res => {
      for (let i of res.catalogs) {
        i["selected"] = false;
        i["score"] = 0;
      }
      this.catalogoConductas.push(...res.catalogs);
    });
  }
  /* 
    Método encargado de obtener los valores de comportamiento y
    conducta (Nombre, tiempo y score)
  */
  sendActionsValues() {
    let conductasSeleccionadas = [];

    this.catalogoConductas.forEach(res => {
      if (res.selected === true) {
        let data = {
          name: res.name,
          time: this.tiempoSeleccionado,
          score: res.score
        };
        conductasSeleccionadas.push(data);
        console.log(conductasSeleccionadas);
      }
    });

    if (this.tipoBitacora === "conducta") {
      this.dailyService
        .putAttitudeDailyRecords(this.paciente._id, conductasSeleccionadas)
        .subscribe(
          res => {
            console.log(res);
            this.disparaAlert("Conductas actualizadas exitosamente");
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.dailyService
        .putBehaviorDailyRecords(this.paciente._id, conductasSeleccionadas)
        .subscribe(
          res => {
            console.log(res);
            this.disparaAlert("Comportamientos actualizados exitosamente");
          },
          err => {
            console.log(err);
          }
        );
    }
  }
  /*
    Método encargado de obtener los valores de crisis (Nombre de 
    la crisis, tiempo y observaciones) para posteriormente enviar 
    los datos al servicio.
  */
  sendCrisisValues() {
    let data = {
      name: this.crisisSeleccionada,
      time: this.tiempoSeleccionado,
      observation: this.observation
    };

    this.dailyService.putCrisisDailyRecords(this.paciente._id, data).subscribe(
      res => {
        console.log("respuesta", res);
        this.disparaAlert("Crisis actualizadas exitosamente");
      },
      err => {
        console.log("error", err);
      }
    );
  }
  /* 
    Botón para salir del modal sin enviar datos.
  */
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  /* 
    Botón para salir del modal enviando datos a la bdd.
  */
  salirConArgumentos() {
    switch (this.tipoBitacora) {
      case "conducta":
        this.sendActionsValues();
        break;
      case "comportamiento":
        this.sendActionsValues();
        break;
      case "crisis":
        this.sendCrisisValues();
        break;
    }

    this.modalCtrl.dismiss();
  }


  disparaAlert(title: string){
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title
    })
  }
}
