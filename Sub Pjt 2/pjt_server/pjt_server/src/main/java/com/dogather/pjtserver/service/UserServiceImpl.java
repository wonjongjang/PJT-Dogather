package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.UserDao;
import com.dogather.pjtserver.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserDao userDao;

    @Override
    public int userRegister(UserDto userDto) {
        int created = userDao.userRegister(userDto);
        if( created == 1){
            return 1;
        }else{
            return 0;
        }
    }
}
