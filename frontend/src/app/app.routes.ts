import { Routes } from '@angular/router';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {LoginComponent} from './shared/login/login.component';
import {authGuard} from './services/utils/guard/auth.guard';
import {ListCategoriesComponent} from './business/list-categories/list-categories.component';
import {FormCategoriesComponent} from './business/form-categories/form-categories.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        component: ListCategoriesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'new-categorie',
        component: FormCategoriesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit-categorie/:categorieId',
        component: FormCategoriesComponent,
        canActivate: [authGuard]
      },
    ]
  }
];
