import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSegment, IonSearchbar } from '@ionic/angular';

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

  constructor() { }

  ngOnInit() {
    this.iSegmentFase.value = this.data[1];
  }

  searchBar(event) {
    this.data[0] = event.detail.value;
    this.post.emit(this.data);
  }
  segmentChangedFase(event) {
    this.data[1] = event.detail.value;
    this.post.emit(this.data);
  }


}
