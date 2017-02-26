package com.innovative.InnovWeb.service.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.innovative.InnovWeb.common.SessionConstants;


public class CustomUsernamePasswordAuthFilter extends
		UsernamePasswordAuthenticationFilter {

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {

		final String loginType = request.getParameter("login-type");
		request.getSession().setAttribute(SessionConstants.LOGIN_TYPE, loginType);
		
		return super.attemptAuthentication(request, response);
	} 

}