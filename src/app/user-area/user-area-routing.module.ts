import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAreaPage } from './user-area.page';

const routes: Routes = [
  {
    path: '',
      children:
          [
              {
                  path:'',
                  component: UserAreaPage
              },
              {
                  path:':month/:year',
                  loadChildren:'./lessons/lessons.module#LessonsPageModule'
              }
          ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAreaPageRoutingModule {}
