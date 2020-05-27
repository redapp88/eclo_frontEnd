import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramsPageRoutingModule } from './programs-routing.module';

import { ProgramsPage } from './programs.page';
import {AddProgramComponent} from './add-program/add-program.component';
import {EditProgramComponent} from './edit-program/edit-program.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramsPageRoutingModule,
      ReactiveFormsModule
  ],
    entryComponents:[AddProgramComponent,EditProgramComponent],
  declarations: [ProgramsPage,AddProgramComponent,EditProgramComponent]
})
export class ProgramsPageModule {}

