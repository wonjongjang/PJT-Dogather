package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.GroupDao;
import com.dogather.pjtserver.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupDao groupDao;

    @Override
    public int groupRegister(GroupDto groupDto) {
        int created = groupDao.groupRegister(groupDto);
        if(created == 1){
            return groupDto.getGroupNo();
        }else{
            return 0;
        }
    }

    @Override
    public int groupUpdate(GroupDto groupDto) {
        int updated = groupDao.groupUpdate(groupDto);
        if(updated == 1){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int groupDelete(int groupNo) {
        int deleted = groupDao.groupDelete(groupNo);
        if(deleted == 1){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public GroupDto group(int groupNo) {
        GroupDto groupDto = groupDao.group(groupNo);
        return groupDto;
    }

    @Override
    public int groupEnter(GroupEnterDto dto) {
        int entered = groupDao.groupEnter(dto);
        if(entered == 1){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int groupOut(GroupEnterDto dto) {
        int out = groupDao.groupOut(dto);
        if(out == 1){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public List<GroupReturnDto> getList() {
        return groupDao.getList();
    }

    @Override
    public int addInterest(GroupInterestDto dto) {
        int result = groupDao.addInterest(dto);
        if(result == 1){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public List<OptionDto> getOptions(int groupNo) {
        List<OptionDto> options = groupDao.getOptions(groupNo);
        return options;
    }

    @Override
    public void addOptions(int groupNo, List<OptionDto> options) {
        for(OptionDto option : options){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("groupNo", groupNo);
            map.put("optionName", option.getOptionName());
            map.put("optionPrice", option.getOptionPrice());
            groupDao.addOption(map);
        }
    }
}
