package com.innovative.InnovWeb.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.innovative.InnovWeb.dao.CommonDAO;
import com.innovative.InnovWeb.dto.SysCodeDTO;

public class SysCodeAccessor {

	
	@Autowired 
	CommonDAO commonDao;
	
	private List<SysCodeDTO> sysCodeDTOList = null;
	public static final String DEFAULT_REC_TYPE = "SYSTEM";
	private SysCodeAccessor()throws Exception{
		
	}
	
	private static class SysCodeAccessorHolder {
		public static SysCodeAccessor instance = null;

		public static SysCodeAccessor getInstance() {
			if (null == instance) {
				try {
					instance = new SysCodeAccessor();
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(instance);
			}
			return instance;
		}
	}
	
	public static SysCodeAccessor getInstance() {
		return SysCodeAccessorHolder.getInstance();
	}

	
	public void initializeSysCode() {
		List<SysCodeDTO> sysCodeDTOList;
		try {
			sysCodeDTOList = commonDao.getAllSysCode();
			if (SysCodeAccessor.getInstance().isEmpty()) {
				SysCodeAccessor.getInstance().setSysCodeDTOList(sysCodeDTOList);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public synchronized void updateSysCodeList(SysCodeDTO sysCodeDTO) {
		sysCodeDTOList.add(sysCodeDTO);
	}
	
	public boolean isEmpty(){
		if(sysCodeDTOList == null){
			return true;
		}else{
			return false;
		}
	}
	public List<SysCodeDTO> getSysCodeDTOList() {
		return sysCodeDTOList;
	}
	
	public SysCodeDTO getSysCodeDTO(String recordType,String codeType,String codeId) {
		for(SysCodeDTO sysCode:getSysCodeDTOList()){
			if(sysCode.getRecordType().equalsIgnoreCase(recordType)&&sysCode.getCodeType().equalsIgnoreCase(codeType)&&sysCode.getCodeId().equalsIgnoreCase(codeId)){
				return sysCode;
			}
		}
		return null;
	}
	
	public List<SysCodeDTO> getSysCodeDTOListForCodeType(String recordType,String codeType) {
		List<SysCodeDTO> syscodes = new ArrayList<SysCodeDTO>();
		for(SysCodeDTO sysCode:getSysCodeDTOList()){
			if(sysCode.getRecordType().equalsIgnoreCase(recordType)&&sysCode.getCodeType().equalsIgnoreCase(codeType)){
				syscodes.add(sysCode);
				
			}
		}
		return syscodes;
	}
	public Map<String,String> getSysCodeDTOListForCodeTypeAsMap(String recordType,String codeType) {
		Map<String,String> syscodeMap= new HashMap<String,String>();
		for(SysCodeDTO sysCode:getSysCodeDTOList()){
			if(sysCode.getRecordType().equalsIgnoreCase(recordType)&&sysCode.getCodeType().equalsIgnoreCase(codeType)){
				syscodeMap.put(sysCode.getCodeId(), sysCode.getCodeDesc());
			}
		}
		return syscodeMap;
	}
	
	public String getDisplayName(String codeType,String codeId) throws Exception {
		for(SysCodeDTO sysCode:getSysCodeDTOList()){
			if(sysCode.getRecordType().equalsIgnoreCase(SyscodeConstants.RECORD_TYPE_SYSTEM)&&sysCode.getCodeType().equalsIgnoreCase(codeType)&&sysCode.getCodeId().equalsIgnoreCase(codeId)){
				return sysCode.getCodeName();
			}
		}
		return null;
	}
	
	public void setSysCodeDTOList(List<SysCodeDTO> sysCodeDTOList) {
		this.sysCodeDTOList = sysCodeDTOList;
	}
}
