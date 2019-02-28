import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FieldError } from 'src/models/field_error';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(
                    (error, caught) => {
                        let errorObj = error;
                        if (errorObj.error) {
                            errorObj = errorObj.error
                        }

                        if (!errorObj.status) {
                            errorObj = JSON.parse(errorObj);
                        }

                        switch (errorObj.status) {
                            case 401:
                                this.handlerError401();
                                break;

                            case 422:
                                this.handlerError422(errorObj);
                                break;

                            case 403:
                                break;    

                            default:
                                this.handlerDefaultError();
                        }
                        return Observable.throw(errorObj);
                    }
                ),
            );
    }

    handlerDefaultError() {       
        Swal.fire('Ops...','Algum erro inesperado ocorreu','error');
    }

    handlerError401() {
        Swal.fire('Erro de Autenticação', 'Email e/ou Senha inválido(s)', 'error');
    }

    handlerError422(error) {
        let s = this.listErrors(error.errors);
        Swal.fire({
            title: 'Erro de Validação',
            type: 'error',
            html:
                s,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
                'OK',

        })
    }

    private listErrors(messages: FieldError[]): string {
        let s = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p>' + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}