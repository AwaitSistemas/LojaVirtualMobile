import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  itens: ProdutoDTO[];

  constructor() { }

  ngOnInit() {

    this.itens = [
      {
          id:"1",
          nome:"Mouse",
          preco:80.90
      },
      {
        id:"2",
          nome:"Teclado",
          preco:100.90
  
      }
    ]
  };
  }


