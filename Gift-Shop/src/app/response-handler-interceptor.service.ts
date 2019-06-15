import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(public toast: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((success) => {
      
      if (success instanceof HttpResponse) {
        if (success.url.endsWith('login') || success.url.endsWith('signup') ||
          success.url.includes('create') || success.url.includes('delete')|| 
          success.url.includes('newOrder')|| success.url.includes('edit')
       || success.url.includes('addPendingOrders') || success.url.includes('deleteSingleOrder')) {
          
          this.toast.success(success.body.message, 'Success');
        }
      }
    }), catchError((err) => {
      console.log('from error ', err);
      this.toast.error(err.error.message, 'Error');
      throw err;
    }))
  }
}
