import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramViewPageRoutingModule } from './program-view-routing.module';

import { ProgramViewPage } from './program-view.page';
import {ComponentsModule} from '../../../components.module';
import {GeneralProgramViewComponent} from './general-program-view/general-program-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramViewPageRoutingModule,
      ReactiveFormsModule,
      ComponentsModule
  ],
    entryComponents:[GeneralProgramViewComponent],
  declarations: [ProgramViewPage,GeneralProgramViewComponent]
})
export class ProgramViewPageModule {}
