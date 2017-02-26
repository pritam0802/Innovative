package com.innovative.InnovWeb.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AppController {
	@RequestMapping(value="/app")
	public String loadApplication(Model model, HttpServletRequest request) {
		return "application";
	}
	
	@RequestMapping(value="/adminLoginAuth")
	public String loginAuth(Model model, HttpServletRequest request, @RequestParam(value="auth",defaultValue="false", required=false)String auth) {
		if(auth!=null&&auth.equalsIgnoreCase("false")){
			model.addAttribute("auth","false");
			return "adminLoginPage";
		}else{
			model.addAttribute("auth","true");
			return "adminLoginPage";
		}
	} 
}
