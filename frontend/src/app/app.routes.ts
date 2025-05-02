import { Routes } from '@angular/router';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {LoginComponent} from './shared/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: SidebarComponent
  }
];
