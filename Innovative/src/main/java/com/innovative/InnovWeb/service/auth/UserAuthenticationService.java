package com.innovative.InnovWeb.service.auth;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.innovative.InnovWeb.common.SessionConstants;
import com.innovative.InnovWeb.dao.UserDAO;
import com.innovative.InnovWeb.dto.AppUser;

@Service("UserAuthService")
public class UserAuthenticationService implements UserDetailsService {

	/*
	 * @Autowired private HttpServletRequest request;
	 */
	@Autowired UserDAO userDAO;
	
	
	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		
		HttpServletRequest request = null;
		RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
	    if (attribs instanceof ServletRequestAttributes) {
	    	request = (HttpServletRequest) ((ServletRequestAttributes) attribs).getRequest();
	        
	    }
		String userType = (String) request.getSession().getAttribute(SessionConstants.LOGIN_TYPE);
		
		AppUser appUser = userDAO.getUserByUserName(userName,userType);
		if(appUser==null){
			throw new BadCredentialsException("");
		}
		/*if(!appUser.getIsActive()){
			throw new DisabledException("User Is Disabled");
		}*/
		
		String userBaseRole = "ROLE_ADMIN";
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(userBaseRole));
		
		
		/*List<UserRole> userRoleList = appUser.getUserRoleList();
		for(UserRole userRoleObj:userRoleList){
			Module module = userService.getModule(userRoleObj.getModuleId());
			Role role = userService.getRole(userRoleObj.getRoleId());
			String roleStr = "ROLE_"+module.getShortCode()+"_"+role.getRoleAccess();
			authorities.add(new SimpleGrantedAuthority(roleStr));
		}*/
		User user = new User(appUser.getUserName(),appUser.getPassword(), authorities);
		return user;
	}
}
