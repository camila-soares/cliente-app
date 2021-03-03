import { Observable } from 'rxjs';

import { ClientesService } from './../../clientes.service';
import { Cliente } from './../clientes';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: ClientesService, 
              private router: Router, 
              private activeRoute: ActivatedRoute) { 
      this.cliente = new Cliente();
    
  }

  ngOnInit() {
    let params : Observable<Params> = this.activeRoute.params

    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service.getClientById(this.id)
        .subscribe(response => this.cliente = response,
        erroResponse => this.cliente = new Cliente()
      );
      }
    })
  }

  onSubmit(){
    if(this.id ){
      this.service.updateClient(this.cliente)
      .subscribe( 
        response => {
          this.success = true;
          this.errors = null;
        }, erroResponse => {
          this.errors = ['Erro ao atualizar'];
        });
    }else {
      this.service.salvar(this.cliente)
      .subscribe( response => {
      this.success = true;
      this.errors = null;
    } , errorResponse => {
      this.success = false;
        this.errors = errorResponse.error.errors;
      }
    )
    }
  }

  updateCliente() {
    this.service.updateClient(this.cliente)
    .subscribe( 
      response => {
        this.errors = null;
      }, erroResponse => {
        this.errors = ['Erro ao atualizar'];
      });
  }

  voltar() {
    this.router.navigate(['/clientes/lista'])
  }

}
