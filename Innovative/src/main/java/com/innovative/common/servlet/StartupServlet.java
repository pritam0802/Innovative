package com.innovative.common.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;

import com.innovative.InnovWeb.common.SysCodeAccessor;

public class StartupServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	Logger logger = Logger.getLogger(StartupServlet.class);



	@Override
	public void init() throws ServletException {
		super.init();
		try {
			SysCodeAccessor.getInstance().initializeSysCode();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
