import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAreaPageRoutingModule } from './user-area-routing.module';

import { UserAreaPage } from './user-area.page';
import {PersProgramViewComponent} from './pers-program-view/pers-program-view.component';
import {ComponentsModule} from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAreaPageRoutingModule,ComponentsModule
  ],
    entryComponents:[],
  declarations: [UserAreaPage]
})
export class UserAreaPageModule {}
