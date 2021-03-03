import { ServicoPrestadoService } from './../../servico-prestado.service';
import { ServicoPrestado } from './../ServicoPrestado';
import { ClientesService } from './../../clientes.service';
import { Cliente } from './../../clientes/clientes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  service: ServicoPrestado;
  success:boolean = false;
  errors: String[];
  mensagemSucesso: string;
  mensagemErro : string;

  constructor(private serviceCliente : ClientesService, private servicoPrestadoService: ServicoPrestadoService) { 
    this.service = new ServicoPrestado();
  }

  ngOnInit() {
    console.log(this.gelAllClientes());
  }

  gelAllClientes() {
    this.serviceCliente.getClientes()
    .subscribe( resonse => this.clientes = resonse)
  }
      
  onSubmit(){
    this.servicoPrestadoService.salvar(this.service)
    .subscribe( response => {
      this.success = true; 
      this.errors = null;
      this.service = new ServicoPrestado();
       }, 
       erroResponse => {
         this.success= false;
         this.errors = erroResponse.error.errors;
        });
  
  } 

}
