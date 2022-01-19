package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.UserDto;
import com.dogather.pjtserver.jwt.JwtProvider;
import com.dogather.pjtserver.jwt.JwtRet;
import com.dogather.pjtserver.service.UserService;
import com.dogather.pjtserver.service.UserServiceImpl;
import com.mysql.cj.xdevapi.JsonArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto){
    	System.err.println("User Controller Register Method run!");
    	
        int created = userService.userRegister(userDto);
        
        if (created == 1){
            return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
        }else{
            return new ResponseEntity<UserDto>(userDto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    //로그인 
    @PostMapping("/login")
    public ResponseEntity<JwtRet> login(@RequestBody UserDto userDto){
    	System.err.println("User Controller Login Method run!");
    	JwtRet ret =  new JwtRet(); //return value for client by JSON
    	
    	// 로그
    	UserDto loginResult = userService.userLogin(userDto); // userService에 로그인 요청
    	if (loginResult != null) {
    		// 있는 아이디
    		if (loginResult.getUserNo() == 0) {
    			// 비밀번호 틀림
    			System.err.println("로그인 요청 : 비밀번호 틀림!!!");
    			ret.setMsg("wrongPw");
    			return new ResponseEntity<JwtRet>(ret, HttpStatus.NOT_FOUND);
    		}else {
    			// 로그인 성공 
    			String jwt = JwtProvider.getToken(loginResult.getUserId());
    			loginResult.setUserPw(null);
    			ret.setJwt(jwt);
    			ret.setMsg("success");
    			ret.setUserInfo(loginResult);
    	    	return new ResponseEntity<JwtRet>(ret, HttpStatus.OK);
    		}
    	}else { 
    		//없는 아이디
    		System.err.println("로그인 요청 : 비밀번호 틀림!!!");
    		ret.setMsg("wrongid");
    		return new ResponseEntity<JwtRet>(ret, HttpStatus.NOT_FOUND);
    	}
    	
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> find(@PathVariable String userId, @RequestHeader String jwt){
    	System.err.println("User Controller Find Method run!");
    	String validationResult = JwtProvider.validateToken(jwt, userId);
    	if(userId.equals(validationResult)) {
    		UserDto userInfo = userService.userFind(userId);
    		userInfo.setUserPw(null);
    		return ResponseEntity.status(HttpStatus.OK).body(userInfo);//ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    	}else {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);//ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    	}
    }
  
}
