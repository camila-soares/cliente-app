import { LayoutComponent } from './../layout/layout.component';
import { ServicoPrestadoListComponent } from './servico-prestado-list/servico-prestado-list.component';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path:   'servico-prestado', component: LayoutComponent,  canActivate : [AuthGuard], children: [
    { path: 'form', component: ServicoPrestadoFormComponent},
    { path:  'lista', component: ServicoPrestadoListComponent },
    { path: '', redirectTo: '/servico-prestado/lista', pathMatch: 'full' }

  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
