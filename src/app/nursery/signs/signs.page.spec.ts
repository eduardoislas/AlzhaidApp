import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignsPage } from './signs.page';

describe('SignsPage', () => {
  let component: SignsPage;
  let fixture: ComponentFixture<SignsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
