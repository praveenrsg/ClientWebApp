import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { apiErrorHandler } from "./utils";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.exclude_urls(request.url)) {
      request = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${localStorage.getItem("access_token")}`),
        url: request.url
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.exclude_urls(request.url)) {
            this.router.navigate(["/auth"]);
          }
          apiErrorHandler(error.status);
        }
        return throwError(() => error);
      }),
    );
  }

  private exclude_urls(url: string): boolean {
    const url_list = ["auth/signin", "/auth/validateemail", "/auth/signup", "/auth/resendConfirmationEmail",
      "/auth/confirmemail", "/auth/changepassword"];
    const isExist = url_list.find(list => url.includes(list));
    if (!isExist) {
      return true;
    } else {
      return false;
    }
  }

}
