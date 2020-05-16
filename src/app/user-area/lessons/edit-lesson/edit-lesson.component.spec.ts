import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLessonComponent } from './edit-lesson.component';

describe('EditLessonComponent', () => {
  let component: EditLessonComponent;
  let fixture: ComponentFixture<EditLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLessonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
