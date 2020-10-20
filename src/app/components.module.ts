import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPasswordComponent} from './shared/edit-password/edit-password.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {PersProgramViewComponent} from './user-area/pers-program-view/pers-program-view.component';
import {UserDetailsComponent} from './shared/user-details/user-details.component';
import {EditUserComponent} from './admin-area/users/edit-user/edit-user.component';



@NgModule({
  declarations: [EditPasswordComponent,PersProgramViewComponent,UserDetailsComponent,EditUserComponent],
    entryComponents:[EditPasswordComponent,PersProgramViewComponent,UserDetailsComponent,EditUserComponent],
    exports:[EditPasswordComponent,UserDetailsComponent,EditUserComponent],
  imports: [
      IonicModule,
      CommonModule,
      ReactiveFormsModule
  ]
})
export class ComponentsModule { }
