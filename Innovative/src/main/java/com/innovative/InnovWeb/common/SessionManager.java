package com.innovative.InnovWeb.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author rizwan
 *
 *         To change the template for this generated type comment go to
 *         Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */

public class SessionManager {
	private static HttpSession httpSession = null;
	public static HttpServletRequest req = null;
	private static SessionManager sessionManager = null;

	private SessionManager() {

	}

	/**
	 * @param request
	 * @return
	 */
	public static SessionManager getInstance(HttpServletRequest request) {
		req = request;
		// if(null==httpSession&&null!=request)
		// {
		httpSession = request.getSession(true);
		// }
		if (null == sessionManager) {
			sessionManager = new SessionManager();
		}
		return sessionManager;
	}

	/**
	 * @param key
	 * @return
	 */
	public Object getSessionAttribute(String key) {
		if (key != null)
			return httpSession.getAttribute(key);
		else
			return null;
	}

	/**
	*
	*/
	public void destroySession() {
		httpSession.invalidate();
	}

	/**
	 * @param key
	 * @param value
	 */
	public void setSessionAttribute(String key, Object value) {
		try {
			if (null != key && null != value)
				httpSession.setAttribute(key, value);
		} catch (Exception e) {

		}
	}

	/**
	 * Removes the vluae from session for a particular key
	 * 
	 * @param key
	 */
	public void removeSessionAttribute(String key) {
		try {
			if (null != key)
				httpSession.removeAttribute(key);
		} catch (Exception e) {

		}
	}

	/**
	 * Removes the vluae from session for a particular key
	 * 
	 * @param key
	 */
	public boolean containsSessionAttribute(String key) {
		Object sessionAttrib = null;
		try {
			if (null != key)
				sessionAttrib = httpSession.getAttribute(key);
		} catch (Exception e) {

		}
		return (sessionAttrib == null || sessionAttrib.equals("")) ? false : true;
	}

	public HttpSession getSessionForRequest(HttpServletRequest request) {
		return httpSession;
	}
}

