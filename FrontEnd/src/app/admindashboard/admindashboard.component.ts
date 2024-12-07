import { CommonModule } from '@angular/common'; 

import { Component, OnInit } from '@angular/core'; 

import { FormsModule } from '@angular/forms'; 

import { HttpClientModule } from '@angular/common/http'; 

import { AdmineService, Attendance, Employee } from '../service/adminservice.service'; 

import { Router } from '@angular/router'; 

 

@Component({ 

  selector: 'app-admindashboard', 

  standalone: true, 

  imports: [CommonModule, FormsModule, HttpClientModule], 

  templateUrl: './admindashboard.component.html', 

  styleUrls: ['./admindashboard.component.css'], 

}) 

export class AdmindashboardComponent implements OnInit { 

  currentAction: string = ''; 

  employees: Employee[] = []; 

  newEmployee: Employee = { id: 0, name: '', role: '', department: '' }; 

  searchEmployeeId: number = 0; 

  foundEmployee: Employee | null = null; 

  attendanceRecords: Attendance[] = []; 

 

  constructor(private adminService: AdmineService,private router: Router) {} 

  

  ngOnInit(): void { 

    

    this.loadEmployees(); 

  } 

 

  selectAction(action: string) { 

    this.currentAction = action; 

 

    if (action === 'view') { 

      this.loadEmployees(); 

    } else if (action === 'attendance') { 

      this.loadAttendanceDetails(); 

    } 

  } 

 

  loadEmployees() { 

    this.adminService.getAllEmployees().subscribe({ 

      next: (data) => (this.employees = data), 

      error: (err) => console.error('Error loading employees:', err) 

    }); 

  } 

 

  loadAttendanceDetails() { 

    this.adminService.getAttendanceDetails().subscribe({ 

      next: (data) => (this.attendanceRecords = data), 

      error: (err) => console.error('Error loading attendance:', err) 

    }); 

  } 

 

  addEmployee() { 

    this.adminService.addEmployee(this.newEmployee).subscribe({ 

      next: (employee) => { 

        this.employees.push(employee); 

        this.newEmployee = { id: 0, name: '', role: '', department: '' }; // Reset form 

      }, 

      error: (err) => console.error('Error adding employee:', err) 

    }); 

  } 

 

  searchEmployee() { 

    this.foundEmployee = this.employees.find(emp => emp.id === this.searchEmployeeId) || null; 

  } 

 

  updateEmployee() { 

    if (this.foundEmployee) { 

      this.adminService.updateEmployee(this.foundEmployee).subscribe({ 

        next: (updatedEmployee) => { 

          const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id); 

          if (index !== -1) { 

            this.employees[index] = updatedEmployee; 

          } 

          this.foundEmployee = null; // Clear form after update 

        }, 

        error: (err) => console.error('Error updating employee:', err) 

      }); 

    } 

  } 

 

  deleteEmployee() { 

    if (this.foundEmployee) { 

      this.adminService.deleteEmployee(this.foundEmployee.id).subscribe({ 

        next: () => { 

          this.employees = this.employees.filter(emp => emp.id !== this.foundEmployee!.id); 

          this.foundEmployee = null; // Clear form after delete 

        }, 

        error: (err) => console.error('Error deleting employee:', err) 

      }); 

    } 

  } 

 

  back() { 

    localStorage.removeItem('isAdminLoggedIn');

    console.log('Navigating to Home'); 

    this.router.navigate(['/admin']); 

  } 

} 