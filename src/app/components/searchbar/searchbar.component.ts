import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSegment, IonSearchbar } from '@ionic/angular';
//import { DailyRecordService } from 'src/app/services/daily-record.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @ViewChild('iSegmentFase', { static: true }) iSegmentFase: IonSegment;
  @ViewChild('iSearchbar', { static: true }) iSearchbar: IonSearchbar;

  @Output() post = new EventEmitter<string[]>();

  data = ['', 'inicial'];
  //pacientes;

  constructor(/*private dailyService: DailyRecordService*/) {  }

  ngOnInit() {
    this.iSegmentFase.value = this.data[1];
    //this.getDailyRecords();
  }

  searchBar(event) {
    this.data[0] = event.detail.value;
    this.post.emit(this.data);
  }
  segmentChangedFase(event) {
    this.data[1] = event.detail.value;
    this.post.emit(this.data);
  }

  /*getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(element => {
        this.pacientes.push(element);
      });
    });
  }*/

}
