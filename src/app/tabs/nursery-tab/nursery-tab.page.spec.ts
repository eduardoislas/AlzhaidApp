import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NurseryTabPage } from './nursery-tab.page';

describe('NurseryTabPage', () => {
  let component: NurseryTabPage;
  let fixture: ComponentFixture<NurseryTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseryTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NurseryTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
