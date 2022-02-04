package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.GroupDto;
import com.dogather.pjtserver.dto.GroupEnterDto;
import com.dogather.pjtserver.dto.GroupInterestDto;
import com.dogather.pjtserver.dto.GroupListDto;
import com.dogather.pjtserver.service.GroupService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    GroupService groupService;

    @GetMapping("/list")
    public ResponseEntity<GroupListDto> list(){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getList());
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/{groupNo}")
    public ResponseEntity<GroupDto> group(@PathVariable int groupNo){
        GroupDto groupDto = groupService.group(groupNo);
        return new ResponseEntity<GroupDto>(groupDto, HttpStatus.OK);

    }

    @PostMapping("/register")
    public ResponseEntity<Integer> register(@RequestBody GroupDto groupDto){
        int created = groupService.groupRegister(groupDto);
        if(created != 0){
            return new ResponseEntity<Integer>(created, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(created, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{groupNo}")
    public ResponseEntity<Integer> update(@RequestBody GroupDto groupDto){
        int updated = groupService.groupUpdate(groupDto);
        if(updated == 1){
            return new ResponseEntity<Integer>(updated, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(updated, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{groupNo}")
    public ResponseEntity<Integer> delete(@PathVariable int groupNo){
        int deleted = groupService.groupDelete(groupNo);
        if(deleted == 1){
            return new ResponseEntity<Integer>(deleted, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(deleted, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/enter")
    public ResponseEntity<Integer> enter(@RequestBody GroupEnterDto dto){
        int entered = groupService.groupEnter(dto);
        if(entered == 1){
            return new ResponseEntity<Integer>(entered, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(entered, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/out")
    public ResponseEntity<Integer> out(@RequestBody GroupEnterDto dto) {
        int out = groupService.groupOut(dto);
        if (out == 1) {
            return new ResponseEntity<Integer>(out, HttpStatus.OK);
        } else {
            return new ResponseEntity<Integer>(out, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/interest")
    public ResponseEntity<Integer> interest(@RequestBody GroupInterestDto dto){
        int result = groupService.interest(dto);
        if(result == 1){
            return new ResponseEntity<Integer>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/interestlist/{userNo}")
    public ResponseEntity<List<GroupInterestDto>> interestlist(@PathVariable int userNo){
        List<GroupInterestDto> dto = groupService.interestlist(userNo);
        if(dto != null){
            dto = groupService.interestlistdetail(dto);
            return new ResponseEntity<List<GroupInterestDto>>(dto, HttpStatus.OK);
        }else{
            return new ResponseEntity<List<GroupInterestDto>>(dto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
