import { ClienteService } from 'src/service/domain/cliente.service';
import { EnderecoDTO } from './../../../models/endereco.dto';
import { ClienteDTO } from './../../../models/cliente.dto';
import { CartService } from './../../../service/domain/cart-service';
import { CartItem } from './../../../models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoDTO } from './../../../models/pedido.dto';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/service/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    private activatedRouter: ActivatedRoute,
    public cartService: CartService,
    public clienteService: ClienteService,
    private router: Router,
    public pedidoService: PedidoService
  ) {
    this.pedido = JSON.parse(this.activatedRouter
      .snapshot.paramMap.get('pedido'));
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        console.log(response);
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(
          this.pedido.enderecoDeEntrega.id,
          response['enderecos']
        )
        console.log(this.pedido.enderecoDeEntrega.id)
      },
        error => {
          this.router.navigate(['home']);
        }
      )
  }
  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.router.navigate(['cart']);

  }


  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
      },
        error => {
          if (error.status == 403) {
            this.router.navigate(['home']);
          }
        });
  }




}
