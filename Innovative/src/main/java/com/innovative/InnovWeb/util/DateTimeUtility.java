package com.innovative.InnovWeb.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateTimeUtility {
	public static String getDateTimeDDMMYYYY(Date date){
		String dateStr = "";
		if(date== null)return dateStr;
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		dateStr = format.format(date);
		return dateStr;
	}
	
	public static double getDaysBetween(Date date1, Date date2){
		if(date1 == null || date2 == null){
			return 0L;
		}
		double diff = date2.getTime() - date1.getTime();
		double dayCount = diff / (24 * 60 * 60 * 1000);
		return dayCount;
	}
	
	public static int daysBetween(Calendar startDate, Calendar endDate) {
	    long end = endDate.getTimeInMillis();
	    long start = startDate.getTimeInMillis();
	    return (int) TimeUnit.MILLISECONDS.toDays(Math.abs(end - start));
	}
	public static String getMonth(Calendar cal) {
	    String[] monthNames = { "January", "February", "March", "April", "May", "June", "July",
	            "August", "September", "October", "November", "December" };
	    return monthNames[cal.get(Calendar.MONTH)];
	}
}
