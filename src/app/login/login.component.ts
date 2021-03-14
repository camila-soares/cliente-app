import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from './user';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  messageSuccess: string;
  errors: String[];

  constructor(private router: Router, private authservice: AuthService) { }

 async loginWithCognito() {
   try {
     let user = await Auth.signIn(this.username.toString(), this.password.toString());
     console.log("USER",user)
     console.log('Autenticado para usuario=' + this.username + 'senha=' + this.password + 'login result==' + user);
     let tokens = user.signInUserSession;
     if( tokens != null){
       console.log('usuario autenticado');
       this.router.navigate(['/home']);

     }
   } catch (error) {
     console.log(error);
     alert('Falha na authenticacao');
   }
  }

  onSubmit() {

    this.authservice
          .logar( this.username, this.password )
          .subscribe(response => {
            const access_token = JSON.stringify(response)
            localStorage.setItem('access_token', access_token)
            console.log("access",access_token)
          this.router.navigate(['/home'])
          }, errorResponse => {
            console.log(errorResponse.error )
            this.errors = [ 'Usuário e/ou senha incorreto(s).' ]
            
          })
    
  }

  logout() {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  salvar() {
    const user = new User();
    user.username = this.username;
    user.password = this.password;
    this.authservice.salvar(user)
    .subscribe( response =>{
      this.messageSuccess = "Cadastro realizado com sucesso! Efetue o login "
      this.loginError = false;
      this.cadastrando = false;
      this.username = '';
      this.password = '';
    }, error => {
      this.errors = error.error.errors;
      this.loginError = true;
      this.messageSuccess = null;
    })
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }
}
