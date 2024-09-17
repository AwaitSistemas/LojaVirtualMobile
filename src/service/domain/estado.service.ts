import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EstadoDTO } from 'src/models/estado.dto';

@Injectable()
export class EstadoService {
    constructor(public http: HttpClient){}

    findAll(): Observable<EstadoDTO[]>{
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseURL}/estados`);
    }

}