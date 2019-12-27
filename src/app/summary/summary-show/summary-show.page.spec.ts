import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryShowPage } from './summary-show.page';

describe('SummaryShowPage', () => {
  let component: SummaryShowPage;
  let fixture: ComponentFixture<SummaryShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
