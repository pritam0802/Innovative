package com.innovative.InnovWeb.util;

import java.awt.Color;
import java.net.URL;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.html.WebColors;
import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

public class PDFUtility {
	public static PdfPTable getImageTable(URL imageUrl,float spacingAfterTable) {
		return getImageTable(imageUrl, spacingAfterTable, 80);
	}
	
	public static PdfPTable getImageTable(URL imageUrl,float spacingAfterTable,float imageScale) {
		Image img = null;
		try {
			img = Image.getInstance(imageUrl);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		img.scaleToFit(imageScale, imageScale);
		PdfPTable imageTable = new PdfPTable(1);
		imageTable.setWidthPercentage(10);
		PdfPCell imgCell = new PdfPCell(img);
		imgCell.setBorder(Rectangle.NO_BORDER);
		imgCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		imageTable.addCell(imgCell);
		imageTable.setSpacingAfter(spacingAfterTable);
		return imageTable;
	}
	
	public static PdfPTable getBoldTextTable(String text,float fontSize,float width,int align,float spaceAfter){
		PdfPTable table = new PdfPTable(1);
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, fontSize, Font.BOLD)));
		cell.setHorizontalAlignment(align);
		cell.setBorder(Rectangle.NO_BORDER);
		table.setSpacingAfter(spaceAfter);
		table.addCell(cell);
		table.setWidthPercentage(width);
		return table;
	}
	public static PdfPTable getBoldTextTableColored(String text,float fontSize,float width){
		PdfPTable table = new PdfPTable(1);
		Color c = WebColors.getRGBColor("#3993ba");
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, fontSize, Font.NORMAL,c)));
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setBorder(Rectangle.NO_BORDER);
		table.setSpacingAfter(20);
		table.addCell(cell);
		table.setWidthPercentage(width);
		return table;
	}
	public static PdfPTable getTextTable(String text,float fontSize,float width,float spaceAfter){
		PdfPTable table = new PdfPTable(1);
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, fontSize, Font.NORMAL)));
		cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell.setBorder(Rectangle.NO_BORDER);
		table.setSpacingAfter(spaceAfter);
		table.addCell(cell);
		table.setWidthPercentage(width);
		return table;
	}
	
	public static PdfPTable getSpacer() {
		PdfPTable spacerTable = new PdfPTable(1);
		spacerTable.setWidthPercentage(10);
		return spacerTable;
	}
	
	public static PdfPTable getSpacer5() {
		PdfPTable spacerTable = new PdfPTable(1);
		spacerTable.setWidthPercentage(5);
		PdfPCell cell = new PdfPCell();
		cell.setBorder(Rectangle.NO_BORDER);
		spacerTable.addCell(cell);
		return spacerTable;
	}
	
	public static PdfPCell getCellNormal(String text){
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, 10, Font.NORMAL)));
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		return cell;
	}
	public static PdfPCell getCellNormal(String text,int align){
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, 9, Font.NORMAL)));
		cell.setBorder(Rectangle.BOX);
		cell.setHorizontalAlignment(align);
		cell.setPadding(3f);
		return cell;
	}
	
	public static PdfPCell getCellBold(String text){
		return getCellBold(text,Element.ALIGN_LEFT);
	}
	public static PdfPCell getCellBold(String text,int align){
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, 10, Font.BOLD)));	
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setHorizontalAlignment(align);
		cell.setPadding(3f);
		return cell;
	}
	public static PdfPCell getHeaderCell(String text){
		Color textColor = WebColors.getRGBColor("#FFFFFF");
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, 12, Font.BOLD);
		f.setColor(textColor);
		PdfPCell cell = new PdfPCell(new Phrase(text,f));	
		Color c = WebColors.getRGBColor("#fcb856");
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setBackgroundColor(c);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		return cell;
	}
	public static PdfPCell getCellHeader(String text){
		Color textColor = WebColors.getRGBColor("#FFFFFF");
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, 10, Font.BOLD);
		f.setColor(textColor);
		PdfPCell cell = new PdfPCell(new Phrase(text,f));	
		Color c = WebColors.getRGBColor("#3993ba");
		cell.setBorder(Rectangle.BOX);
		cell.setBackgroundColor(c);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setPadding(5f);
		return cell;
	}
	public static PdfPCell getFirstCellHeader(String text,float size){
		Color textColor = WebColors.getRGBColor("#FFFFFF");
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, size, Font.BOLD);
		f.setColor(textColor);
		PdfPCell cell = new PdfPCell(new Phrase(text,f));	
		Color c = WebColors.getRGBColor("#3993ba");
		cell.setBorder(Rectangle.BOX);
		cell.setBackgroundColor(c);
		cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell.setPadding(5f);
		return cell;
	}
	public static PdfPCell getMainHeader(String text,int align){
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, 14, Font.BOLD);
		PdfPCell cell = new PdfPCell(new Phrase(text,f));	
		cell.setBorder(Rectangle.BOTTOM);
		cell.setHorizontalAlignment(align);
		cell.setPadding(5f);
		return cell;
	}
	public static PdfPCell getInvoiceTableHeader(String text,int align){
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, 10, Font.BOLD);
		PdfPCell cell = new PdfPCell(new Phrase(text,f));
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setHorizontalAlignment(align);
		cell.setPadding(5f);
		return cell;
	}
	public static PdfPCell getFooterCell(String text,int align){
		Color textColor = WebColors.getRGBColor("#15c");
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, 8, Font.NORMAL);
		f.setColor(textColor);
		PdfPCell cell = new PdfPCell(new Phrase(text,f));
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setHorizontalAlignment(align);
		return cell;
	}
	public static PdfPCell getBorderedCell(String text,int align){
		PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(
				FontFactory.HELVETICA, 10, Font.NORMAL)));
		cell.setBorder(Rectangle.BOX);
		cell.setHorizontalAlignment(align);
		return cell;
	}
	public void onEndPage(PdfWriter writer,Document document) {
		Color textColor = WebColors.getRGBColor("#15c");
		Font f = FontFactory.getFont(
				FontFactory.HELVETICA, 8, Font.NORMAL);
		f.setColor(textColor);
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_LEFT, new Phrase("PurchOrd.CLF",f), 25, 22, 0);
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_LEFT, new Phrase("ACTIVE HOSPITALITY SUPPLIES",f), 25, 10, 0);
        ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER, new Phrase("Page " + document.getPageNumber(),f), 555, 10, 0);
    }
}
