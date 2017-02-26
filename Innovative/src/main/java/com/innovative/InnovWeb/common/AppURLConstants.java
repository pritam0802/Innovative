package com.innovative.InnovWeb.common;

public class AppURLConstants {
	
	public static final String USER_BY_USERNAME = "/user/{userName}";
	public static final String REST = "/rest";
	public static final String GET_STATES = "/states";
	public static final String GET_LOGGEDIN_USER = "/loggedInUser";
	public static final String ALL_SYSCODE = "/syscodes";
	
	public static final String GET_ITEMS = "/items";
	public static final String ITEM_PRICING_BY_ITEM_ID = "/item/{itemId}/state/{stateId}";
	public static final String GET_SIZES_OF_ITEM = "/item/{itemId}/state/{stateId}/sizes";
	public static final String CREATE_QUOTE = "/quote/create";
	public static final String UPDATE_QUOTE = "/quote/update";
	public static final String GET_EXISTING_QUOTES = "/quotes";
	public static final String REQUEST_EXTRA_DISCOUNT = "/quote/requestExtraDiscount";
	public static final String CONFIRM_QUOTE = "/quote/{quoteId}/confirm";
	public static final String GET_QUOTE_BY_ID = "/quote/{quoteId}";
	public static final String GET_ITEMS_PRICING = "/items/pricing";
	public static final String CHANGE_ITEM_PRICE = "/item/price/change";
	public static final String GET_LAST_WEEK_QUOTES = "/quotes/lastWeek";
	public static final String GET_DASHBOARD_ITEM = "/dashboardItem";
	
	public static final String PRINT_QUOTE = "/quote/{quoteId}/print";
	public static final String FOLLOW_UP_QUOTE = "/quote/{quoteId}/followUp";
	
	

}
