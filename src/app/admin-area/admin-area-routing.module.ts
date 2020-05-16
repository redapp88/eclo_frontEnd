import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAreaPage } from './admin-area.page';
import {UserAreaPage} from '../user-area/user-area.page';

const routes: Routes = [
    {
        path: '',
        component: AdminAreaPage,
        children:[
            {path: 'users',loadChildren: './users/users.module#UsersPageModule' },
            {path: 'programs',
                children:
                    [
                        {
                            path:'',
                            loadChildren: './programs/programs.module#ProgramsPageModule'
                        },
                        {
                            path:':month/:year',
                            loadChildren: './programs/program-view/program-view.module#ProgramViewPageModule'
                        }
                    ]
               },
            {path:'', redirectTo:'/adminArea/programs', pathMatch:'full'}

        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAreaPageRoutingModule {}
