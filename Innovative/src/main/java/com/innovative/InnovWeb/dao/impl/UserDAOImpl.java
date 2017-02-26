package com.innovative.InnovWeb.dao.impl;

import org.springframework.stereotype.Repository;

import com.innovative.InnovWeb.dao.UserDAO;
import com.innovative.InnovWeb.dto.AppUser;

@SuppressWarnings("unchecked")
@Repository("UserDAO")
public class UserDAOImpl implements UserDAO {

	@Override
	public AppUser getUserByUserName(String userName, String userType) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
