import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddProgramComponent } from './add-program.component';

describe('AddProgramComponent', () => {
  let component: AddProgramComponent;
  let fixture: ComponentFixture<AddProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
