import { CommonModule } from '@angular/common'; 

import { HttpClientModule } from '@angular/common/http'; 

import { Component } from '@angular/core'; 

import { FormsModule } from '@angular/forms'; 

import { Router } from '@angular/router'; 

 

@Component({ 

  selector: 'app-admin', 

  standalone: true, 

  imports: [FormsModule, CommonModule, HttpClientModule], 

  templateUrl: './admin.component.html', 

  styleUrl: './admin.component.css' 

}) 

export class AdminComponent { 

 

  adminId: string = ''; 

  password: string = ''; 

  loginError: string = ''; // Add this property to handle login errors 

 

  // Hardcoded credentials for front-end-only authentication 

  private staticAdminId = 'admin123'; 

  private staticPassword = 'password'; 

 

  constructor(private router: Router) {} 

 

  onLogin() { 

    if (this.adminId !== this.staticAdminId && this.password !== this.staticPassword) { 

      this.loginError = 'Both Admin ID and Password are incorrect!'; 

    } else if (this.adminId !== this.staticAdminId) { 

      this.loginError = 'Admin ID is incorrect!'; 

    } else if (this.password !== this.staticPassword) { 

      this.loginError = 'Password is incorrect!'; 

    } else { 

      localStorage.setItem('isAdminLoggedIn', 'true');

      this.router.navigate(['/admindashboard']); 

      console.log('Navigating to dashboard...'); 

      this.loginError = ''; // Clear the error on successful login 

      // Redirect to dashboard or perform other actions 

    } 

  } 

 

  back() { 

    localStorage.removeItem('isAdminLoggedIn');

    console.log('Navigating to Home'); 

    this.router.navigate(['/home']); 

  } 

 

} 

 