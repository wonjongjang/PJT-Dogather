package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.UserDto;

public interface UserService {
    public int userRegister(UserDto userDto);
    public UserDto userLogin(UserDto userDto);
    public UserDto userFind(String userId);
}
