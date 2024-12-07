package com.employee.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.employee.entity.Employee;
import com.employee.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    private final EmployeeService service;
    private final RestTemplate restTemplate; 

    

    public EmployeeController(EmployeeService service, RestTemplate restTemplate) { 

    this.service = service; 

    		this.restTemplate = restTemplate; 

    } 

    // Add an employee
    @PostMapping("/add")
    public Employee addEmployee(@RequestBody Employee employee) {
        return service.addEmployee(employee);
    }

    // Get all employees
    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @GetMapping("/{empId}")
    public Map<String, Object> getEmployeeById(@PathVariable Long empId) {
        Employee employee = service.getEmployeeById(empId);
        Map<String, Object> response = new HashMap<>();
        if (employee != null) {
            response.put("isValid", true);
            response.put("name", employee.getName()); // Assuming `Employee` has a `getName` method
        } else {
            response.put("isValid", false);
            response.put("name", null);
        }
        return response;
    }

    // Update an employee
    @PutMapping("/update/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return service.updateEmployee(id, employee).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    // Delete an employee
    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
    }
    
    @GetMapping("/attendance/all") 

    public Object getAllAttendanceDetails() { 

    // URL of the Attendance Service API 

    	String attendanceServiceUrl = "http://localhost:8082/api/attendance/all"; 

    // Make a GET request to Attendance Service using RestTemplate 

    Object attendanceDetails = restTemplate.getForObject(attendanceServiceUrl, Object.class); 

    return attendanceDetails; // Return the response received from Attendance Service 

    } 
}
