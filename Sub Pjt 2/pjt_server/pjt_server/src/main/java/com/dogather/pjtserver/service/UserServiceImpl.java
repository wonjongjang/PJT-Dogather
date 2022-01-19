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

	@Override
	public UserDto userLogin(UserDto userDto) { // 로그인
		UserDto user = userDao.userFind(userDto.getUserId()); // 유저의 아이디를 통해 정보 얻어옴
		if(user != null){// 있는 아이디
			//PW check
			if(user.getUserPw().equals(userDto.getUserPw())) {
				//로그인 성공
				return user;
			}else {
				//로그인 실패
				return userDto; // => pk : 0
			}
		}else {
			// 없는 아이디
			return null;
		}
	}

	@Override
	public UserDto userFind(String userId) {
		return userDao.userFind(userId); // 유저의 아이디를 통해 유저정보 얻어옴
	}
}
