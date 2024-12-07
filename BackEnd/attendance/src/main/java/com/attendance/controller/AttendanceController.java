package com.attendance.controller;

import com.attendance.entity.Attendance;
import com.attendance.service.AttendanceService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/checkin/{empId}")
    public String checkIn(@PathVariable int empId) {
        return attendanceService.checkIn(empId);
    }

    @PostMapping("/checkout/{empId}")
    public Map<String, Object> checkOut(@PathVariable int empId) {
        String message = attendanceService.checkOut(empId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        return response;
    }
    
    @GetMapping("/all") 

    public List<Attendance> getAllAttendanceDetails() { 

    return attendanceService.getAllAttendanceDetails(); 

    } 
}
