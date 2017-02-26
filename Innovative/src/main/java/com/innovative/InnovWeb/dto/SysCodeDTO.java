package com.innovative.InnovWeb.dto;

import java.io.Serializable;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "otc_sys_code")
@Cacheable
public class SysCodeDTO implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 2896794976875450211L;

	@Id
	@Column(name = "SYS_CODE_ID")
	private Long sysCodeId;

	@Column(name = "RECORD_TYPE")
	private String recordType=null;

	@Column(name = "CODE_TYPE")
	private String codeType=null;

	@Column(name = "CODE_ID")
	private String codeId=null;

	@Column(name = "CODE_NAME")
	private String codeName=null;

	@Column(name = "CODE_DESC")
	private String codeDesc=null;

	public Long getSysCodeId() {
		return sysCodeId;
	}

	public void setSysCodeId(Long sysCodeId) {
		this.sysCodeId = sysCodeId;
	}

	public String getRecordType() {
		return recordType;
	}

	public void setRecordType(String recordType) {
		this.recordType = recordType;
	}

	public String getCodeType() {
		return codeType;
	}

	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}

	public String getCodeId() {
		return codeId;
	}

	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public String getCodeDesc() {
		return codeDesc;
	}

	public void setCodeDesc(String codeDesc) {
		this.codeDesc = codeDesc;
	}
}

