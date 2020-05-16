import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralProgramViewComponent } from './general-program-view.component';

describe('GeneralProgramViewComponent', () => {
  let component: GeneralProgramViewComponent;
  let fixture: ComponentFixture<GeneralProgramViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralProgramViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralProgramViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
