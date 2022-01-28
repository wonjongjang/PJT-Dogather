package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.GroupDao;
import com.dogather.pjtserver.dto.GroupDto;
import com.dogather.pjtserver.dto.GroupEnterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupDao groupDao;

    @Override
    public int groupRegister(GroupDto groupDto) {
        int created = groupDao.groupRegister(groupDto);
        if(created == 1){
            return 1;
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
}
