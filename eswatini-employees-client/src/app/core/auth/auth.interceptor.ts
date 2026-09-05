import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { appConfig } from '../config/app-config';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(appConfig.apiBaseUrl)) return next(request);

  const auth = inject(AuthService);
  return from(auth.accessToken()).pipe(
    switchMap((token) => {
      const authenticatedRequest = token
        ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : request;

      return next(authenticatedRequest);
    })
  );
};
