package com.innovative.InnovWeb.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.innovative.InnovWeb.common.AppURLConstants;
import com.innovative.InnovWeb.common.SessionConstants;
import com.innovative.InnovWeb.common.SessionManager;
import com.innovative.InnovWeb.common.SysCodeAccessor;
import com.innovative.InnovWeb.dao.CommonDAO;
import com.innovative.InnovWeb.dto.AppUser;
import com.innovative.InnovWeb.dto.SysCodeDTO;
import com.innovative.InnovWeb.service.CommonService;

@Controller
public class CommonController extends RestController {

	@Autowired
	CommonDAO commonDAO;
	
	@Autowired
	CommonService commonService;
	
	@RequestMapping(value = AppURLConstants.GET_LOGGEDIN_USER, method = RequestMethod.GET)
	public @ResponseBody AppUser getLoggedInUser(Model model, HttpServletRequest request) {
		AppUser loggedInUser=(AppUser) SessionManager.getInstance(request).getSessionAttribute(SessionConstants.CURRENT_USER);
		return loggedInUser;
	}
	@RequestMapping(value=AppURLConstants.ALL_SYSCODE,method = RequestMethod.GET)
	public @ResponseBody List<SysCodeDTO>  initialize() throws Exception{
    	return SysCodeAccessor.getInstance().getSysCodeDTOList();
	}
	

}
