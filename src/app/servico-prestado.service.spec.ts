import { ServicoPrestadoBusca } from './servico-prestado/ServicoPrestadoBusca';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ServicoPrestadoService } from './servico-prestado.service';

fdescribe('ServicoPrestadoService', () => {
  let service: ServicoPrestadoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoPrestadoService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(ServicoPrestadoService)
  });

  it('should return a list of clients', () => {
      const dummyResponse = {
        ServicoPrestadoBusca: [{
          id: 1,
          description: 'Camila',
          value: '100,00',
          date: '03/03/2021'
        }, {
          id: 2,
          description: 'Fulano',
          value: '200,00',
          date: '030332021'
        }]
      };
     })
});
