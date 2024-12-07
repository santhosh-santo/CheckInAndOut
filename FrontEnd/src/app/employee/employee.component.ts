import { CommonModule } from '@angular/common'; 

import { Component } from '@angular/core'; 

import { FormsModule } from '@angular/forms'; 

import { Router } from '@angular/router'; 

import { EmployeeserviceService } from '../service/employeeservice.service'; 

  

@Component({ 

  selector: 'app-employee', 

  standalone: true, 

  imports: [CommonModule, FormsModule,], 

  templateUrl: './employee.component.html', 

  styleUrl: './employee.component.css' 

}) 

export class EmployeeComponent { 
  empId!: number; 
  empName: string = ''; // To store the fetched employee name
  attendanceDetails: any[] = []; 

  constructor(private attendanceService: EmployeeserviceService, private router: Router) {} 

  // Fetch Employee Name
  fetchEmployeeName() {
    if (this.empId) {
      this.attendanceService.getEmployeeDetails(this.empId).subscribe((response: any) => {
        if (response.isValid) {
          this.empName = response.name; // Display the employee name
        } else {
          this.empName = 'Invalid Employee ID';
        }
      });
    }
  }
  
  // Check-In Method
  checkIn() {
    this.attendanceService.checkIn(this.empId).subscribe((response: string) => {
      alert(response); // Show the check-in response

      // Reset the Employee ID and Name fields
      this.resetFields();
    });
  }
  
  // Check-Out Method
  checkOut() {
    this.attendanceService.checkOut(this.empId).subscribe(
      (response: { message: string; workingHours: string }) => {
        alert(`${response.message}`); // Show the check-out response

        // Reset the Employee ID and Name fields
        this.resetFields();
      },
      (error) => {
        console.error('Error during check-out:', error); // Log errors if any
        alert('An error occurred during check-out.');
      }
    );
  }

  // Navigate Back
  back() { 
    console.log('Navigating to Home'); 
    this.router.navigate(['/home']); 
  }

  // Reset Fields
  resetFields() {
    this.empId = null as any; // Clear the Employee ID
    this.empName = ''; // Clear the Employee Name
  }
}
