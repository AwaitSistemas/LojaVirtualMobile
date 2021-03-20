import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/api.config";
import { tap } from 'rxjs/operators';
import { CredenciaisDTO } from "src/models/credenciais.dto";

@Injectable()
export class AuthService{

    constructor(private http: HttpClient){
        
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/login`,
            creds, 
            { observe: 'response',  responseType: 'text' }
        ).pipe(tap( res => {

          console.log(res)
          
          const token = res.headers.get('Authorization');

        }))
      }
    }