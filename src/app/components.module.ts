import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPasswordComponent} from './shared/edit-password/edit-password.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {PersProgramViewComponent} from './user-area/pers-program-view/pers-program-view.component';



@NgModule({
  declarations: [EditPasswordComponent,PersProgramViewComponent],
    entryComponents:[EditPasswordComponent,PersProgramViewComponent],
    exports:[EditPasswordComponent],
  imports: [
      IonicModule,
      CommonModule,
      ReactiveFormsModule
  ]
})
export class ComponentsModule { }
