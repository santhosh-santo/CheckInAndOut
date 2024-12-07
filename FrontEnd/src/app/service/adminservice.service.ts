import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
}

export interface Attendance {
  id: number; 
  empId: number; 
  checkInTime: string; 
  checkOutTime: string; 
  workingHours: string; 
}

@Injectable({
  providedIn: 'root', 
})
export class AdmineService {
  private baseUrl = 'http://localhost:8080/api/employees'; // Backend base URL

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/add`, employee);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/all`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/update/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${employeeId}`);
  }
  getAttendanceDetails(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/attendance/all`);
  }
}
