import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPasswordComponent} from './shared/edit-password/edit-password.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {PersProgramViewComponent} from './user-area/pers-program-view/pers-program-view.component';
import {UserDetailsComponent} from './shared/user-details/user-details.component';



@NgModule({
  declarations: [EditPasswordComponent,PersProgramViewComponent,UserDetailsComponent],
    entryComponents:[EditPasswordComponent,PersProgramViewComponent,UserDetailsComponent],
    exports:[EditPasswordComponent,UserDetailsComponent],
  imports: [
      IonicModule,
      CommonModule,
      ReactiveFormsModule
  ]
})
export class ComponentsModule { }
