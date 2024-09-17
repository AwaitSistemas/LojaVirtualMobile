import { CartService } from './../../../service/domain/cart-service';
import { PedidoDTO } from './../../../models/pedido.dto';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/service/domain/cliente.service';
import { StorageService } from 'src/service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    private activatedRouter: ActivatedRoute,
    public storage: StorageService,
    public clienteService: ClienteService,
    public nav: NavController,
    private router: Router,
    public cartService: CartService

  ) {
    this.pedido = JSON.parse(this.activatedRouter
      .snapshot.paramMap.get('pedido'));
  }

  ngOnInit() {

    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']

          let cart = this.cartService.getCart();
          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            items: cart.items.map(x => {
              return {
                quantidade: x.quantidade,
                produto: { id: x.produto.id }
              }
            }
            )
          }

        },
          error => {
            if (error.status == 403) {
              this.nav.navigateForward('/home');
            }
          });
    }
    else {
      this.nav.navigateForward('/home');
    }


  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    let pedidoDTO = JSON.stringify(this.pedido)

    this.router.navigate(['payment', { pedido: pedidoDTO }]);

    console.log(this.pedido);
  }


}
