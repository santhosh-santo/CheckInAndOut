package com.attendance.service;

import com.attendance.entity.Attendance;
import com.attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private RestTemplate restTemplate;

    public String checkIn(int empId) {
        String employeeServiceUrl = "http://localhost:8080/api/employees/" + empId;

        try {
            // Fetch employee details from Employee Management Service
            Map<String, Object> employeeDetails = restTemplate.getForObject(employeeServiceUrl, Map.class);

            if (employeeDetails != null && (Boolean) employeeDetails.get("isValid")) {
                String employeeName = (String) employeeDetails.get("name");

                // Check if the employee already has an active check-in
                Attendance existingAttendance = attendanceRepository.findTopByEmpIdOrderByIdDesc(empId);
                if (existingAttendance != null && existingAttendance.getCheckOutTime() == null) {
                    return "Employee ID: " + empId + " (" + employeeName + ") already has an active check-in. Please check-out first.";
                }

                // Create new attendance record
                Attendance attendance = new Attendance();
                attendance.setEmpId(empId);
                attendance.setCheckInTime(LocalDateTime.now());
                attendanceRepository.save(attendance);

                return "Check-in successful for Employee ID: " + empId + " (" + employeeName + ")";
            } else {
                return "Invalid Employee ID!";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Employee Service is unavailable. Error: " + e.getMessage();
        }
    }


    public String checkOut(int empId) { 

    	// Get the latest check-in record for the employee 

    	Attendance attendance = attendanceRepository.findTopByEmpIdOrderByIdDesc(empId); 

    	if (attendance == null || attendance.getCheckOutTime() != null) { 

    	return "Check-out not possible. No valid check-in found."; 

    	} 

    	// Record the check-out time 

    	LocalDateTime checkOutTime = LocalDateTime.now(); 

    	attendance.setCheckOutTime(checkOutTime); 

    	// Calculate total hours worked 

    	Duration duration = Duration.between(attendance.getCheckInTime(), checkOutTime); 

    	long hours = duration.toHours(); 

    	long minutes = duration.toMinutes() % 60; 

    	// Save the record 

    	attendance.setWorkingHours(String.format("%02d:%02d", hours, minutes)); // Store as HH:MM format 

    	attendanceRepository.save(attendance); 

    	// Return response 

    	return "Check-out successful. Total hours worked: " + String.format("%02d:%02d", hours, minutes); 

    	} 

    	public List<Attendance> getAllAttendanceDetails() { 

    	// Fetch all records from the Attendance table 

    	return attendanceRepository.findAll(); 

    	} 

    	} 

    	 

    	 