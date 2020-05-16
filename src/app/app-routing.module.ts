import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardManagers} from './login/authManagers.guard';
import {AuthGuardUsers} from './login/authUsers.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule',canLoad:[AuthGuardUsers] },
    {path: 'login',loadChildren: './login/login.module#LoginPageModule' },
    {path: 'userArea',loadChildren: './user-area/user-area.module#UserAreaPageModule',canLoad:[AuthGuardUsers]},
  {path: 'adminArea',loadChildren: './admin-area/admin-area.module#AdminAreaPageModule',canLoad:[AuthGuardManagers]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
