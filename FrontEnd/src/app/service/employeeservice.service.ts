import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {
    private baseUrl = 'http://localhost:8082/api/attendance';
  
    constructor(private http: HttpClient) {}
  
    checkIn(empId: number) {
      const url = `${this.baseUrl}/checkin/${empId}`;
      return this.http.post(url, null, { responseType: 'text' });
    }
    
    getEmployeeDetails(empId: number) {
      const url = `http://localhost:8080/api/employees/${empId}`;
      return this.http.get(url); // Expects a Map<String, Object> response
    }
  
    

    checkOut(empId: number) {
      const url = `${this.baseUrl}/checkout/${empId}`;
      return this.http.post<{ message: string; workingHours: string }>(url, null);
    }
    
}
