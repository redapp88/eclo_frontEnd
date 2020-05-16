import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLessonComponent } from './add-lesson.component';

describe('AddLessonComponent', () => {
  let component: AddLessonComponent;
  let fixture: ComponentFixture<AddLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
