// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })


// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate() {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     }
    
//     this.router.navigate(['/auth/login']);
//     return false;
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate() {
//     if (this.authService.isAdmin()) {
//       return true;
//     }
    
//     this.router.navigate(['/dashboard']);
//     return false;
//   }
// }