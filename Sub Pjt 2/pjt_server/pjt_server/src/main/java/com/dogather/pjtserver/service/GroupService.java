package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.*;

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
    public int addInterest(GroupInterestDto dto);
    public List<OptionDto> getOptions(int groupNo);
    public void addOptions(int groupNo, List<OptionDto> options);
}
