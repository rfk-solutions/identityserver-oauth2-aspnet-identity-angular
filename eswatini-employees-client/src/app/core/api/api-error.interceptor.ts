import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ModalService } from '../modal/modal.service';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const modal = inject(ModalService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (request.url.includes('/api/')) {
        void modal.error(getApiMessage(error));
      }
      return throwError(() => error);
    })
  );
};

function getApiMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string' && error.error.trim()) return error.error;
  if (error.error?.message) return error.error.message;
  if (error.error?.title) return error.error.title;
  if (error.error?.errors) {
    const messages = Object.values(error.error.errors as Record<string, string[]>).flat();
    if (messages.length) return messages.join(' ');
  }
  if (error.status === 0) return 'The API could not be reached. Check that the server is running and try again.';
  if (error.status === 401) return 'Your session has expired. Please sign in again.';
  if (error.status === 403) return 'You do not have permission to perform this action.';
  if (error.status === 404) return 'The requested resource could not be found.';
  return `The request could not be completed (${error.status}). Please try again.`;
}
