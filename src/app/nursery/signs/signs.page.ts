import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signs',
  templateUrl: './signs.page.html',
  styleUrls: ['./signs.page.scss'],
})
export class SignsPage implements OnInit {
today = Date.now();
  constructor() { }

  ngOnInit() {
  }

}
