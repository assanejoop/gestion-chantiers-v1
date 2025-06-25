import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth.service';

// Interceptor fonctionnel pour Angular 18
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Récupérer le token depuis le service
  const token = authService.getToken();
  
  // Si on a un token, l'ajouter aux headers
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  
  // Sinon, continuer sans modification
  return next(req);
};

