import { Component, OnInit } from '@angular/core';
import { User } from './../model/User';
import { Router } from '@angular/router';
import { ProdutoService } from '../service/produtos.service';
import { AuthService } from './../service/auth.service';
import { Produtos } from '../model/Produtos';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  categoriaTela: string
  produto: Produtos= new Produtos()
  produtos: Produtos[]

  user: User = new User()
  idUser = environment.id
  token = environment.token
  nomeCooperativa = environment.nomeFisOuJuri
  fotoTela = environment.fotoUser


  constructor(
    private router : Router,
    private produtoService:ProdutoService,
    private authService: AuthService,
  ) { }


  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
      alert('Sua sessão expirou,faça o login novamente')
    }
    this.findAllProdutos();
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produtos[]) => {
      this.produtos = resp
      console.log(resp)
    }, err => {
      console.log(this.produtos)
    })
  }


  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:User)=>{
      this.user= resp
      })
    }




  categoriaTipo(event: any){
    this.categoriaTela = event.target.value
  }

  cadastrar(){
    this.user.id = environment.id
    this.produto.usuarios = this.user
    this.produto.tipo = this.categoriaTela
    console.log(this.produto)

    this.produtoService.postProduto(this.produto).subscribe((resp:Produtos)=>{
      this.produto = resp

      alert('produto cadastrado com sucesso!')
      this.produto = new Produtos
    })
}


}



