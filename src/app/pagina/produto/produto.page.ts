import { API_CONFIG } from './../../../config/api.config';
import { ProdutoService } from './../../../service/domain/produto.service';
import { ProdutoDTO } from './../../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  items: ProdutoDTO[];

  constructor(

    public activatedRouter: ActivatedRoute,
    public produtoService: ProdutoService,
    private router: Router
  ) { 

  }

  ngOnInit() {
    let categoria_id = this.activatedRouter.snapshot.paramMap.get('data');
    
    this.produtoService.findByCategoria(categoria_id)    
    .subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    },
    
    error =>{

      });
  }

  loadImageUrls() {
    for(var i = 0; i< this.items.length; i++){
      let item = this.items[i];
    this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response =>{
        item.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${item.id}-small.jpg`;
      },
      error =>{});
    }

  }

  showDetail(produto_id: string){
     let data = JSON.stringify(produto_id);
    this.router.navigate(['produto-detail', {data}]);
  }
}


