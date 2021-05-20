import { Observable } from 'rxjs';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ProdutoDTO } from 'src/models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor(public http:HttpClient){}

    findById(produto_id: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseURL}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string){
        return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}`);

    }

    getSmallImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.backetBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.backetBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}