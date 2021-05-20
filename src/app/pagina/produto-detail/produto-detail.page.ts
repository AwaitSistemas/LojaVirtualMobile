import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/service/domain/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(
    public produtoService: ProdutoService,
    public activedRouter: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activedRouter.snapshot.paramMap.get('data');

    this.produtoService.findById(id)
      .subscribe(response => {
       this.item = response;
       this.getImageUrlIfExists();
      },
      error => {});
    
  }

  getImageUrlIfExists(){

    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response =>{
        this.item.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${this.item.id}.jpg`;
      }, error  =>{});
}

}
