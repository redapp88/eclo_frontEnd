import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonsPageRoutingModule } from './lessons-routing.module';

import { LessonsPage } from './lessons.page';
import {AddLessonComponent} from './add-lesson/add-lesson.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule,
      ReactiveFormsModule
  ],
    providers:[DatePipe],
    entryComponents:[AddLessonComponent,EditLessonComponent],
  declarations: [LessonsPage,AddLessonComponent,EditLessonComponent]
})
export class LessonsPageModule {}
