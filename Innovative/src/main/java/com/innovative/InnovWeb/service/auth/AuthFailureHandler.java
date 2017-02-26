package com.innovative.InnovWeb.service.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {

		if (exception.getCause() instanceof DisabledException) {
			super.setDefaultFailureUrl("/adminLoginAuth?disabled=true");
		}

		if (exception.getCause() instanceof BadCredentialsException) {
			super.setDefaultFailureUrl("/adminLoginAuth?auth=false");
		}

		super.onAuthenticationFailure(request, response, exception);
	}
}
