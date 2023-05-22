import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/auth-guard.service';

import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/login/login.module')
      .then(mod => mod.LoginModule)
  },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  {
    path: 'transaction',
    loadChildren: () => import('./modules/transaction/transaction.module')
      .then(mod => mod.AboutModule),canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module')
      .then(mod => mod.SignupModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'    
})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }