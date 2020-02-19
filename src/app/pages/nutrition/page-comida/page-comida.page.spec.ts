import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageComidaPage } from './page-comida.page';

describe('PageComidaPage', () => {
  let component: PageComidaPage;
  let fixture: ComponentFixture<PageComidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageComidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageComidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
