import { API_CONFIG } from './../../config/api.config';
import { LocalUser } from './../../models/local_user';
import { ClienteDTO } from './../../models/cliente.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService{
    constructor(
        public http: HttpClient,
        public storage: StorageService
        ){ }

    findByEmail(email: string) : Observable<ClienteDTO> {
        let token = this.storage.getLocalUser().token;
        let autHeader = new HttpHeaders({'Authorization': 'Bearer '+ token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseURL}/clientes/email?value=${email}`, {'headers': autHeader}
        );
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.backetBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }


}