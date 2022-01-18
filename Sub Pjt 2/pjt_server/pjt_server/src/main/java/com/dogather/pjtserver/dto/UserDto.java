package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.ToString;

@Data
public class UserDto {
    private int userNo;
    private String userId;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userAddr;
    private String userAddrDetail;
    private int userZip;
    private String userTel;
    private String userEmail;
}
