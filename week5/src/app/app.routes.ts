import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Account } from './account/account';

export const routes: Routes = [
  {
    path: '',
    component: Login,
    title: 'Login',
  },
  {
    path: 'account',
    component: Account,
    title: 'Account',
  },
];
