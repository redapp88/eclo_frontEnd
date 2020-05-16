import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import {AddUserComponent} from './add-user/add-user.component';
import {EditLessonComponent} from '../../user-area/lessons/edit-lesson/edit-lesson.component';
import {AddLessonComponent} from '../../user-area/lessons/add-lesson/add-lesson.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ComponentsModule} from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
      ReactiveFormsModule,
      ComponentsModule
  ],
    entryComponents:[AddUserComponent,EditUserComponent],
  declarations: [UsersPage,AddUserComponent,EditUserComponent]
})
export class UsersPageModule {}
