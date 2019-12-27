import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationsAddPage } from './notifications-add.page';

describe('NotificationsAddPage', () => {
  let component: NotificationsAddPage;
  let fixture: ComponentFixture<NotificationsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
