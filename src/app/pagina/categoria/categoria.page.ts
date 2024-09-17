import { CategoriaService } from './../../../service/domain/categoria.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from 'src/config/api.config';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  bucketUrl: string = API_CONFIG.backetBaseUrl;
  itens:CategoriaDTO[];

  constructor(
    public categoriaService: CategoriaService,
    public router: Router,
    public menu: MenuController  ) { }

    ionViewWillEnter() {
      this.menu.enable(true);
    }

  ionViewDidLoad(){
  }

  ngOnInit() {

    this.categoriaService.findAll()
        .subscribe(response => {

          this.itens = response;
          
          console.log(response);
        },
        error => {
          console.log( error);
        });
  }

  showProdutos(categoria_id: string){
    
    let data = JSON.stringify(categoria_id);
    this.router.navigate(['produtos', {data}]);
  }
  
}
