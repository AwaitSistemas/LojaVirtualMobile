import { StorageService } from './../service/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { empty, Observable } from "rxjs";
import { API_CONFIG } from 'src/config/api.config';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseURL.length

        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseURL;
        
        if(localUser && requestToApi){
            const authReq = req.clone({headers:req.headers.set('Authorization', 'Bearer '+ localUser.token)});
            return next.handle(authReq);
        }else {
            
        return next.handle(req)        
        .pipe(
                catchError(
                    error => {
                        console.error(error);
                        return empty();
                    }
                ) 
         );
        }
        }
       
    }


export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};