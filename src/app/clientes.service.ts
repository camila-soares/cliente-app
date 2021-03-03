import { Injectable } from '@angular/core';
import { Cliente } from './clientes/clientes';
import  { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private http: HttpClient) { }
  

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/client', cliente);
  }

  
  getClientes(params?: any) : Observable<Cliente[]>{
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        httpParams = httpParams.append(key, params[key].toString());
      }
    }
    return this.http.get<Cliente[]>('http://localhost:8080/api/client', { params: httpParams});
  }

  getProductPage(page, size) : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`http://localhost:8080/api/client?pageSize=${page}&pageNumber=${size}`);
  }

  getClientById(id: number) : Observable<Cliente>{
    return this.http.get<any>(`http://localhost:8080/api/client/${id}`);
  }

  updateClient(cliente: Cliente)  : Observable<any>{
    return this.http.put<Cliente>(`http://localhost:8080/api/client/${cliente.id}`, cliente);
  }

  deleteClient(cliente: Cliente) : Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/client/${cliente.id}`);
  }


  
}
