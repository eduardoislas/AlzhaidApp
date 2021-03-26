import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { CatalogService } from "src/app/services/catalog.service";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { Info } from "../../../interfaces/daily-records";
import { Router } from '@angular/router';
import { coincidenciasLista } from '../../../helpers/searchbar-helper';
import { mostrarAlertaAdvertencia, mostrarAlertaGrande, mostrarAlertaConfirmacion } from '../../../helpers/alert-helper';

@Component({
  selector: "app-tab2",
  templateUrl: "./tab-activacion.page.html",
  styleUrls: ["./tab-activacion.page.scss"]
})
export class TabActivacionPage implements OnInit {
  opcion;

  busqueda = '';
  fase;
  rol;

  toggleAtencion;
  toggleCalculo;
  toggleEstimulacion;
  toggleLenguaje;
  toggleMemoria;
  toggleReminiscencia;

  emptyDailyRecords;

  pacientes = [];
  coincidencias = [];

  atencion = [];
  calculo = [];
  estimulacion = [];
  lenguaje = [];
  memoria = [];
  reminiscencia = [];
  rutaActual;

  constructor(
    private catalogService: CatalogService,
    private dailyService: DailyRecordService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.rutaActual = this.router.url;
    this.storage.get("Rol").then(val => {
      this.getDailyProgramsPhase(val);
      this.rol = val;
    });

    this.opcion = 'programa';
    this.getCatalogosTipo("actividad");
  }

  validarSobreescrituraDePrograma() {
    if (this.emptyDailyRecords === false) {
      mostrarAlertaGrande('Ya hay un programa diario',"¿Desea sobreescribirlo?",'warning','/phase');
    } 
  }

  segmentChangedRegistros(event) {
    this.opcion = event.detail.value;
    if (this.opcion === "desempeno") this.getTodayDailyRecords();

    if (this.opcion === "programa") this.validarSobreescrituraDePrograma();
    //this.opcion === "programa" ? this.getCatalogosTipo("actividad") : this.getTodayDailyRecords();
  }
  /* 
    Método que obtiene el arreglo enviado por el componente
    searchbar.
  */
  searchBar(event) {
    this.busqueda = event.detail.value;
    this.coincidencias = coincidenciasLista(this.pacientes,this.busqueda);
  }

  getDailyProgramsPhase(phase: string) {
    this.dailyService.getDailyProgramPhase(phase).subscribe(res => {
      res.cuantos === 0 ? this.emptyDailyRecords = true : this.emptyDailyRecords = false;
      this.validarSobreescrituraDePrograma();
      console.log("Ya actualicé si es o no empty");
    });
  }
  /* 
    Método encargado de limpiar el arreglo de pacientes, llamar al servicio
    de getDailyRecordsToday() el cual obtiene los dailyRecords del día y los
    filtra por la fase elegida en el ion segment.
  */
  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];

    switch (this.rol) {
      case "FASE_INICIAL":
        this.fase = "inicial";
        break;
      case "FASE_INTERMEDIA":
        this.fase = "intermedia";
        break;
      case "FASE_AVANZADA":
        this.fase = "avanzada";
        break;
    }

    // Se obtienen todos los pacientes filtrados por su fase.
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(r => {
        if (r.patient.phase === this.capitalize(this.fase)) {
          this.pacientes.push(r);
        }
      });

      this.coincidencias = this.pacientes;
    });
  }
  /* 
    Método encargado de abrir el modal de actividades.
  */
  openActividades(paciente) {
    this.router.navigateByUrl(`${this.rutaActual}/page-actividades`, { state: { data: paciente } });
  }
  /*
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  /* 
    Método encargado de llamar el servicio getCatalogsType() el
    cual se encarga de traer el catalogo de actividades, filtrar
    el tipo de actividad y guardarlo en su respectivo arreglo.
  */
  getCatalogosTipo(type: string) {
    this.atencion = [];
    this.calculo = [];
    this.estimulacion = [];
    this.lenguaje = [];
    this.memoria = [];
    this.reminiscencia = [];

    this.catalogService.getCatalogsType(type).subscribe(res => {
      for (let i of res.catalogs) {
        i["selected"] = false;
      }
      res.catalogs.forEach(r => {
        switch (r.classification) {
          case "Atención":
            this.atencion.push(r);
            break;
          case "Cálculo":
            this.calculo.push(r);
            break;
          case "Estimulación sensorial":
            this.estimulacion.push(r);
            break;
          case "Lenguaje":
            this.lenguaje.push(r);
            break;
          case "Memoria":
            this.memoria.push(r);
            break;
          case "Reminiscencia":
            this.reminiscencia.push(r);
            break;
        }
      });
    });
  }
  /*
    Método que sirve para enviar los datos seleccionados en
    el modal de actividades, esto utilizando el servicio postDailyProgram().
  */
  salirConArgumentos() {
    let attention = [];
    let calculus = [];
    let sensory = [];
    let language = [];
    let memory = [];
    let reminiscence = [];

    this.atencion.forEach(r => {
      if (r.selected === true) {
        let data: Info = {
          name: r.name,
          classification: r.classification
        };
        attention.push(data);
        r.selected = false;
      }
    });

    this.calculo.forEach(r => {
      if (r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        };
        calculus.push(data);
        r.selected = false;
      }
    });

    this.estimulacion.forEach(r => {
      if (r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        };
        sensory.push(data);
        r.selected = false;
      }
    });

    this.lenguaje.forEach(r => {
      if (r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        };
        language.push(data);
        r.selected = false;
      }
    });

    this.memoria.forEach(r => {
      if (r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        };
        memory.push(data);
        r.selected = false;
      }
    });

    this.reminiscencia.forEach(r => {
      if (r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        };
        reminiscence.push(data);
        r.selected = false;
      }
    });

    //Validar que el programa diario no se encuentre vacio
    if (!attention.length && !calculus.length && !sensory.length && !language.length && !memory.length && !reminiscence.length) {
      mostrarAlertaAdvertencia('Programa diario vacío');
    } else {
      let dailyProgram = {
        phase: this.rol,
        activities: {
          attention,
          calculus,
          sensory,
          language,
          memory,
          reminiscence
        }
      };

      this.dailyService.postDailyProgram(dailyProgram).subscribe(
        res => {
          this.getDailyProgramsPhase(this.rol);

          this.toggleAtencion = false;
          this.toggleCalculo = false;
          this.toggleEstimulacion = false;
          this.toggleLenguaje = false;
          this.toggleMemoria = false;
          this.toggleReminiscencia = false;
          reminiscence

          mostrarAlertaConfirmacion('El programa diario se actualizó con éxito');
          this.router.navigateByUrl('/phase');
        },
        err => {
          console.log("Error servicio", err);
        }
      );
    }
  }
}
