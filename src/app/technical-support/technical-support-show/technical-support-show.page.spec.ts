import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechnicalSupportShowPage } from './technical-support-show.page';

describe('TechnicalSupportShowPage', () => {
  let component: TechnicalSupportShowPage;
  let fixture: ComponentFixture<TechnicalSupportShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalSupportShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalSupportShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
