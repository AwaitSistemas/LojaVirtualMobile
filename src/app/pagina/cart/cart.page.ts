import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/service/domain/cart-service';
import { ProdutoService } from 'src/service/domain/produto.service';
import { StorageService } from 'src/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    public storage: StorageService,
    public produtoService: ProdutoService,
    public cartService: CartService,
    private router: Router) { }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
          error => { });
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }
  goOn() {
    this.router.navigate(['categorias']);
  }
  checkout() {
    this.router.navigate(['pick-address']);
  }


  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.items
    this.loadImageUrls();
  }
}
