import { Routes } from '@angular/router';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {LoginComponent} from './shared/login/login.component';
import {authGuard} from './services/utils/guard/auth.guard';
import {ListCategoriesComponent} from './business/category/list-categories/list-categories.component';
import {FormCategoriesComponent} from './business/category/form-categories/form-categories.component';
import {ListProductsComponent} from './business/products/list-products/list-products.component';
import {FormProductsComponent} from './business/products/form-products/form-products.component';

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
      {
        path: 'products',
        component: ListProductsComponent,
        canActivate: [authGuard]
      },

      {
        path: 'new-product',
        component: FormProductsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit-product/:productId',
        component: FormProductsComponent,
        canActivate: [authGuard]
      },
    ]
  }
];
