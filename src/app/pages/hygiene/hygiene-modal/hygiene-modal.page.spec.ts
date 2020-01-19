import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HygieneModalPage } from './hygiene-modal.page';

describe('HygieneModalPage', () => {
  let component: HygieneModalPage;
  let fixture: ComponentFixture<HygieneModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HygieneModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HygieneModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
