package com.employee.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.employee.entity.Employee;
import com.employee.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Optional<Employee> updateEmployee(Long id, Employee updatedEmployee) {
        return repository.findById(id).map(employee -> {
            employee.setName(updatedEmployee.getName());
            employee.setRole(updatedEmployee.getRole());
            employee.setDepartment(updatedEmployee.getDepartment());
            return repository.save(employee);
        });
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
    
    public Employee getEmployeeById(Long empId) {
        
        return repository.findById(empId).orElse(null);
    }


}
