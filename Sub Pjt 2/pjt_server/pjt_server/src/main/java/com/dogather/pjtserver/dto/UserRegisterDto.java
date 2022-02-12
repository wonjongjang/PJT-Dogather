package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class UserRegisterDto {
    private String msg;
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
    private List<Integer> userCategory;

}
