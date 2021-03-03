import { PaginationComponent } from './../pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule} from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { AngularPaginatorModule } from 'angular-paginator';



@NgModule({
  declarations: [ClientesFormComponent, ClientesListaComponent, PaginationComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    AngularPaginatorModule

  ],
  exports: [ClientesFormComponent, ClientesListaComponent]
})
export class ClientesModule { }
