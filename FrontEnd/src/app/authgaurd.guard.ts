import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authgaurdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the admin is logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (isLoggedIn) {
      return true; // Allow access to the route
    }

    // Redirect to the admin login page if not logged in
    this.router.navigate(['/admin']);
    return false;
  }
}
