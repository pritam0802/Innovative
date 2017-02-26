package com.innovative.InnovWeb.service.auth;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.innovative.InnovWeb.common.SessionConstants;
import com.innovative.InnovWeb.common.SessionManager;
import com.innovative.InnovWeb.dao.UserDAO;
import com.innovative.InnovWeb.dto.AppUser;

public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler {

	@Autowired
	UserDAO userDAO;

	private DefaultRedirectStrategy  redirectStrategy =  new DefaultRedirectStrategy();

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		super.onAuthenticationSuccess(request, response, authentication);

		String userName = ((User) authentication.getPrincipal()).getUsername();
		String userType = (String) request.getSession().getAttribute(SessionConstants.LOGIN_TYPE);
		AppUser appUser = userDAO.getUserByUserName(userName,userType);
		
		SessionManager.getInstance(request).setSessionAttribute(SessionConstants.CURRENT_USER, appUser);
		handle(request, response, authentication);

	}

	protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException {
		String targetUrl = determineTargetUrl(authentication);

		if (response.isCommitted()) {
			logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
			return;
		}

		((DefaultRedirectStrategy) redirectStrategy).sendRedirect(request, response, targetUrl);
	}
	
	protected String determineTargetUrl(Authentication authentication) {
        boolean isUser = false;
        boolean isAdmin = false;
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority grantedAuthority : authorities) {
            if (grantedAuthority.getAuthority().equals("ROLE_USER")) {
                isUser = true;
                break;
            } else if (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
                isAdmin = true;
                break;
            }
        }
 
        if (isUser) {
            return "/home";
        } else if (isAdmin) {
            return "/app";
        } else {
            throw new IllegalStateException();
        }
    }
}
