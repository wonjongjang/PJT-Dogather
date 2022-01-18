package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.UserDto;
import com.dogather.pjtserver.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto){
    	System.out.println("User Controller Register Method run!");
    	System.out.println(userDto.getUserId());
        int created = userService.userRegister(userDto);
        
        if (created == 1){
            return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
        }else{
            return new ResponseEntity<UserDto>(userDto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto){
    	System.out.println("User Controller Login Method run!");
    	System.out.println("ID : " + userDto.getUserId());
    	System.out.println("PW : " + userDto.getUserPw());
    	Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    	String jwt = Jwts.builder().setSubject(userDto.getUserId()).signWith(key).compact();
    	System.out.println(jwt);
    	
//    	if(Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody().getSubject().equals(userDto.getUserId())){
//    		System.out.println(Jwts.parserBuilder()
//    			.setSigningKey(key)
//    			.build().parseClaimsJws(jwt)
//    			.getBody().getSubject());
//    		System.out.println("right");
//    	}else {
//    		System.out.println("wrong");	
//    	}
    	
    	return ResponseEntity.status(HttpStatus.OK).body(jwt);//ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }
  
}
