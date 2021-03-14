import { TokenInterceptor } from './../interceptors/token.interceptor';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { ServicoPrestadoService } from './servico-prestado.service';
import { ClientesModule } from './clientes/clientes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { ClientesService } from '../../src/app/clientes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import {Amplify } from 'aws-amplify';

Amplify.configure({
    Auth:{
      mandatorySignIn:true,
      region: 'us-east-1',
      userPoolId: 'us-east-1_0CNO3ctC7',
      userPoolWebClientId: '19qmshnekfuv1obg9rfa1dupok',
      authenticationFlowType:'Client credentials'
    }
  });
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    FormsModule,
    ServicoPrestadoModule
  ],  
  providers: [
    ClientesService, ServicoPrestadoService, AuthService, 
    {
       provide: HTTP_INTERCEPTORS, 
       useClass: TokenInterceptor,
       multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
