package com.innovative.InnovWeb.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "otc_user_master")
public class AppUser implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3671862419296264389L;

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "USER_ID")
	private Long id;

	@Column(name = "USER_NAME")
	private String userName;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "FIRST_NAME")
	private String firstName;

	@Column(name = "MIDDLE_NAME")
	private String middleName;

	@Column(name = "LAST_NAME")
	private String lastName;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "CREATED_DATE")
	private Date createdDate;

	@Column(name = "USER_TYPE")
	private String userTypeId;
	
	@Transient
	String fullName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(String userTypeId) {
		this.userTypeId = userTypeId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getFullName() {
		StringBuilder fullName = new StringBuilder();
		if(this.getFirstName()!=null){
			fullName.append(this.getFirstName()).append(" ");
		}
		if(this.getMiddleName()!=null){
			fullName.append(this.getMiddleName()).append(" ");
		}
		if(this.getLastName()!=null){
			fullName.append(this.getLastName());
		}
		return fullName.toString();
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

}
