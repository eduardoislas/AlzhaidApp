import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelativePage } from './relative.page';

describe('RelativePage', () => {
  let component: RelativePage;
  let fixture: ComponentFixture<RelativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
