package com.attendance.entity;

import java.time.LocalDateTime;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Attendance {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private int empId;

    private LocalDateTime checkInTime;

    private LocalDateTime checkOutTime;

    private String workingHours; 
    
    

    public Attendance() {
		super();
		
	}

	public Attendance(Long id, int empId, LocalDateTime checkInTime, LocalDateTime checkOutTime, String workingHours) {
		super();
		this.id = id;
		this.empId = empId;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.workingHours = workingHours;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public LocalDateTime getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(LocalDateTime checkInTime) {
		this.checkInTime = checkInTime;
	}

	public LocalDateTime getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(LocalDateTime checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public String getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}

	

}
