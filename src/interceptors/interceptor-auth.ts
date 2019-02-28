import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';
import { API_CONFIG } from 'src/config/api.config';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = this.storageService.getLocalUser();
        let length = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, length) == API_CONFIG.baseUrl;

        if (user && requestToAPI) {
            let authReq = req.clone({ headers: req.headers.set('Authorization', "Bearer " + user.token) });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}