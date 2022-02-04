package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.GroupDto;
import com.dogather.pjtserver.dto.GroupEnterDto;
import com.dogather.pjtserver.dto.GroupInterestDto;
import com.dogather.pjtserver.dto.GroupReturnDto;

import java.util.List;

import java.util.List;

public interface GroupService {
    public int groupRegister(GroupDto groupDto);
    public int groupUpdate(GroupDto groupDto);
    public int groupDelete(int groupNo);
    public GroupDto group(int groupNo);
    public int groupEnter(GroupEnterDto dto);
    public int groupOut(GroupEnterDto dto);
    public List<GroupReturnDto> getList();
    public int interest(GroupInterestDto dto);
    public List<GroupInterestDto> interestlist(int userNo);
    public List<GroupInterestDto> interestlistdetail(List<GroupInterestDto> dto);
}
