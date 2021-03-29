import { StorageService } from './../service/storage.service';
/*
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs/internal/observable/throwError';
*/
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const authToken = this.auth.authenticate;
        //console.log(authToken);
           
           return next.handle(req)        
               .pipe(
                   catchError((error, catchError) => {
   
                       let errorObj = error;
                       if(errorObj.error){
                           errorObj = errorObj.error;
                       }
                       if(!errorObj.status) {
                           errorObj = JSON.parse(errorObj);
                       }
                               console.log("Error detectado pelo interceptor");
                               console.error(errorObj);
                    switch(errorObj.status){
                        case 403:
                            this.handler403();
                            break;
                    }
   
                              
   
                               return Observable.throwError(errorObj);
                   })
               ) as any;
           }
           handler403(){ 
                this.storage.setLocalUser(null);
           }
        }



export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};


