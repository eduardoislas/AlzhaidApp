import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssistanceShowPage } from './assistance-show.page';

describe('AssistanceShowPage', () => {
  let component: AssistanceShowPage;
  let fixture: ComponentFixture<AssistanceShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssistanceShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
