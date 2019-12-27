import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacientListModalPage } from './pacient-list-modal.page';

describe('PacientListModalPage', () => {
  let component: PacientListModalPage;
  let fixture: ComponentFixture<PacientListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
