import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authgaurdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (isLoggedIn) {
      return true; 
    }

   
    this.router.navigate(['/admin']);
    return false;
  }
}
