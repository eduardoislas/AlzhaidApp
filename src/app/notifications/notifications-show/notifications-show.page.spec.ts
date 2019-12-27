import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationsShowPage } from './notifications-show.page';

describe('NotificationsShowPage', () => {
  let component: NotificationsShowPage;
  let fixture: ComponentFixture<NotificationsShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
