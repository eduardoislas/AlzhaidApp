import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabRegistrosPage } from './tab-registros.page';

describe('TabRegistrosPage', () => {
  let component: TabRegistrosPage;
  let fixture: ComponentFixture<TabRegistrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRegistrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabRegistrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
