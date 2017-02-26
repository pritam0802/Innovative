package com.innovative.InnovWeb.common;

public interface QueryConstants {
	
	public static final String SELECT_USER_BY_USER_NAME_EXACT = "from AppUser as user where userName = :userName and userTypeId=:userType";
	public static final String SELECT_ALL_STATES = "from State as s";
	public static final String STATE_BY_ID = "from State as s where s.id = :id";
	public static final String CUSTOMER_BY_ID = "from Customer as c where c.id = :id";
	
	/*ITEM MODULE*/
	
	public static final String SELECT_ALL_ITEMS = "from Item as i";
	public static final String SELECT_ITEM_BY_ID = "from Item as i where i.id = :itemId";
	public static final String SELECT_ALL_ITEMS_OF_ITEMTYPE = "from Item as i where i.itemType = :itemType";
	public static final String SELECT_ITEM_PRICING_OF_ITEM_OF_STATE = "from ItemPricing as ip where ip.itemId = :itemId and ip.stateId=:stateId";
	public static final String SELECT_ITEM_PRICING_OF_ITEM_OF_SIZE = "from ItemPricing as ip where ip.itemId = :itemId and ip.size = :size";
	public static final String SELECT_ITEM_PRICING_OF_ITEM_OF_SIZE_MODULARTYPE_OF_STATE = "from ItemPricing as ip where ip.itemId = :itemId and ip.size=:size and ip.modularType = :modularType and ip.stateId=:stateId";
	public static final String SELECT_ITEM_PRICING_OF_ITEM_OF_SIZE_STATE = "from ItemPricing as ip where ip.itemId = :itemId and ip.size=:size and ip.stateId=:stateId";
	public static final String SELECT_QUOTES_BY_CREATED_BY = "from Quote as q where q.createdBy = :userId";
	public static final String SELECT_ALL_QUOTES = "from Quote as q order by q.createdDate desc";
	public static final String SELECT_QUOTE_AMOUNTS_OF_QUOTE = "from QuoteAmount as qa where qa.quoteId = :quoteId";
	public static final String SELECT_lAST_QUOTE = "from Quote order by id DESC LIMIT 1";
	public static final String SELECT_ITEM_PRICINGS_BY_ITEMTYPE_OF_STATE = "from ItemPricing ip where ip.itemId in ( select im.id from Item im where im.itemType=:itemType) and ip.stateId=:stateId";
	public static final String SELECT_ORDERS_FROM_LAST_WEEK = "from Sale as s where s.createdDate >= :fromDate";
	public static final String SELECT_ALL_EXTRA_DISCOUNT_BY_QUOTE = "from ExtraDiscount as ed where ed.quoteId = :quoteId";	
	public static final String DELETE_QUOTE_AMOUNTS_BY_QUOTE_ID ="delete from QuoteAmount as qa where qa.quoteId=:quoteId";
	public static final String SELECT_QUOTE_BY_ID = "from Quote as q where q.id = :quoteId";

}
