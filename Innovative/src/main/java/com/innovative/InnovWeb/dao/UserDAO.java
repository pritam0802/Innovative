package com.innovative.InnovWeb.dao;

import com.innovative.InnovWeb.dto.AppUser;

public interface UserDAO {

	AppUser getUserByUserName(String userName, String userType);

}
