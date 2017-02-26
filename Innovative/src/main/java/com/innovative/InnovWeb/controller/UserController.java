package com.innovative.InnovWeb.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.innovative.InnovWeb.dao.UserDAO;

@Controller
public class UserController extends RestController{

	@Autowired
	UserDAO userDAO;

	/*@RequestMapping(value = AppURLConstants.USER_BY_USERNAME, method = RequestMethod.GET)
	public @ResponseBody AppUser getUser(Model model, @PathVariable String userName, HttpServletResponse response) {

		return userDAO.getUserByUserName(userName);

	}*/

}
