import { Component } from '@angular/core'; 

import { Router } from '@angular/router'; 

 

@Component({ 

  selector: 'app-home', 

  standalone: true, 

  imports: [], 

  templateUrl: './home.component.html', 

  styleUrl: './home.component.css' 

}) 

export class HomeComponent { 

 

  constructor(private router: Router) {} 

 

  navigateToAdmin() { 

    console.log('Navigating to Admin'); 

    this.router.navigate(['/admin']); 

  } 

  navigateToUser() { 

    console.log('Navigating to Admin'); 

    this.router.navigate(['/employee']); 

  } 

 

} 

 

 