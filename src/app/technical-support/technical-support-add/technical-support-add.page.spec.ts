import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechnicalSupportAddPage } from './technical-support-add.page';

describe('TechnicalSupportAddPage', () => {
  let component: TechnicalSupportAddPage;
  let fixture: ComponentFixture<TechnicalSupportAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalSupportAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalSupportAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
