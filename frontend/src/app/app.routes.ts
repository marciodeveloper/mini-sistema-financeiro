import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TransacoesListComponent } from './transacoes/transacoes-list/transacoes-list.component';
import { TransacaoFormComponent } from './transacoes/transacao-form/transacao-form.component';
import { ResumoComponent } from './resumo/resumo.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: TransacoesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transacoes/nova',
    component: TransacaoFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transacoes/editar/:id',
    component: TransacaoFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'resumo',
    component: ResumoComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
