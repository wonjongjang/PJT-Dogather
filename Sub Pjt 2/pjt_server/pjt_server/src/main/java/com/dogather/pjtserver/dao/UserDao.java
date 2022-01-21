package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    public int userRegister(UserDto userDto);
    public UserDto userFind(String userId);
    public int userUpdate(UserDto userDto);
    public void userDelete(String userId);
}
