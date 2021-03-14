import { ClientesService } from './../../clientes.service';
import { Cliente } from './../clientes';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from '../Page';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente;
  mensagemSucesso: string;
  mensagemErro : string;

  clienteSelecionado: Cliente;
  private page : Page;
  name = '';
  cpf = '';
  pageNumber = 0;
  pageSize = 10;
  pag : Number = 1 ;
  contador : Number = 5;
  constructor(
    private service : ClientesService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getClientes();
    this.pageProducts(10, 0);
  }

getClientes() {
  let params = {};
      params = {
        name: this.name,
        cpf: this.cpf,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      console.log('PARAM', params)
  this.service.getClientes(params)
  .subscribe( response => this.clientes = response);
}

novoCadastro() {
  this.router.navigate(['/clientes/form'])
}

 pageProducts(page, size){
    this.service.getProductPage(page, size).subscribe(res => {
      this.clientes = res;
      console.log(this.clientes)
    });
  }

  preparaCliente(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletar() {
    this.service
    .deleteClient(this.clienteSelecionado)
    .subscribe( 
      response => { this.mensagemSucesso = 'Cliente deletado com sucesso.'
      this.ngOnInit();
    },
      erroResponse  => {this.mensagemErro = 'Ocorreu um erro ao deletar'}
    )
      
   console.log(this.clienteSelecionado);
  }

  changePage(event){
   this.pageProducts(event.page, event.size);
  }

  

  
}
