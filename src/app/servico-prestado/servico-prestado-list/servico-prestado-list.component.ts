import { ServicoPrestadoService } from './../../servico-prestado.service';
import { ServicoPrestadoBusca } from './../ServicoPrestadoBusca';
import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/clientes';

@Component({
  selector: 'app-servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styleUrls: ['./servico-prestado-list.component.css']
})
export class ServicoPrestadoListComponent implements OnInit {
  clientes: Cliente[] = [];
  name: '';
  description: '';
  lista: ServicoPrestadoBusca[];
  pageNumber = 0;
  pageSize = 10;
  message: string;

  constructor(private serviceCliente : ClientesService,
          private  service : ServicoPrestadoService ) { }

  ngOnInit() {
    this.gelAllClientes();
    this.buscar();
  }

  gelAllClientes() {
    this.serviceCliente.getClientes()
    .subscribe( resonse => this.clientes = resonse)
    console.log("CLIENTE", this.clientes)
  }

  buscar() {
    let params = {};
      params = {
        description: this.description,
        name: this.name,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };  
      params = { description: this.description, name: this.name };

    this.service.buscar(params)
      .subscribe( response => {
        this.lista = response
        if( this.lista.length <= 0 ) {
          this.message = "Nenhum registro encontrado.";
        } else {
          this.message = null;
        }
      })
  }
}
