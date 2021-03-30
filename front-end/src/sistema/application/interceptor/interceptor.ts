import {Observable, throwError as observableThrowError} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';


@Injectable()
export class Interceptor implements HttpInterceptor {
  /**
   * Instancia a partir do window o NProgress
   */
  progress = window['NProgress'];

  constructor() {
  }

  /**
   * Intercepta todas as requisições
   * @param {HttpRequest<>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.progress.start();

    return next.handle(req)
      .do(evt => {

        this.progress.start();

        if (evt instanceof HttpResponse)
          this.progress.done();

        else
          this.progress.inc(0.4);

      })
      .catch(this.catchErrors());
  }

  /**
   * Função privada, captura os erros
   * @returns {(res: any) => ErrorObservable}
   */
  private catchErrors() {
    /**
     * Encerra progress
     */
    this.progress.done();

    return (res: any) => {
      // if (res.status === 500) {
      //     this.error(res.error.message);
      // }
      //
      // if (res.status === 401 || res.status === 403) {
      //     //handle authorization errors
      //     //in this example I am navigating to logout route which brings the login screen
      //     // this.router.navigate(['login']);
      //     this.error(res.error.message)
      // }
      if (res.error)
        if (typeof res.error === 'string')
          res.error = JSON.parse(res.error);

      this.error(res.error.message);

      this.progress.done();

      return observableThrowError(res);
    };
  }

  /**
   *
   * @param message
   */
  public error(message: string) {
  }
}
