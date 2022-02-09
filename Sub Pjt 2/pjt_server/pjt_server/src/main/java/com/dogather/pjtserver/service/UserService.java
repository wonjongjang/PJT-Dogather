package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.UserDto;

import java.util.List;

public interface UserService {
    public int userRegister(UserDto userDto);
    public UserDto userLogin(UserDto userDto);
    public UserDto userFind(String userId);
    public int userUpdate(UserDto userDto);
    public void userDelete(String userId);
    public String userIdCheck(String id);
    public String userNickCheck(String nick);

}
