import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersProgramViewComponent } from './pers-program-view.component';

describe('PersProgramViewComponent', () => {
  let component: PersProgramViewComponent;
  let fixture: ComponentFixture<PersProgramViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersProgramViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersProgramViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
