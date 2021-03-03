import { ServicoPrestadoBusca } from './servico-prestado/ServicoPrestadoBusca';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/ServicoPrestado';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiUrl: string = environment.apiUrlBase + `/api/service`;
  constructor(private http: HttpClient) { }

  salvar(servico: ServicoPrestado) : Observable<ServicoPrestado>{
      return this.http.post<ServicoPrestado>(`${this.apiUrl}`, servico);
  }

  buscar(params?: any) : Observable<ServicoPrestadoBusca[]>{
    const url = this.apiUrl;
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        httpParams = httpParams.append(key, params[key].toString());
      }
    }
    console.log(params);
    console.log(url);
    return this.http.get<any>(url, { params: httpParams });
    
  }
}
