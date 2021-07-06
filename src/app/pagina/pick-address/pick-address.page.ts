import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor() { }

  ngOnInit() {

    this.items = [
      {
        id: "1",
        logradouro: "Rua Joaquim de Figueiredo",
        numero: "3",
        complemento: "Quadra 1",
        bairro: "Jardim Maringá 2",
        cep: "78120460",
        cidade: {
          id: "1",
          nome: "várzea Grande",
          estado: {
            id: "1",
            nome: "Mato Grosso"
          }
        }
      },

      {
        id: "1",
        logradouro: "Rua Joaquim de Figueiredo",
        numero: "3",
        complemento: "Quadra 1",
        bairro: "Jardim Maringá 2",
        cep: "78120460",
        cidade: {
          id: "1",
          nome: "várzea Grande",
          estado: {
            id: "1",
            nome: "Mato Grosso"
          }
        }
      }
    ]

  }

}
