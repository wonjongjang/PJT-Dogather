package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface GroupDao {
    public int groupRegister(GroupDto groupDto);
    public int groupUpdate(GroupDto groupDto);
    public int groupDelete(int groupNo);
    public GroupDto group(int groupNo);
    public int groupEnter(GroupEnterDto dto);
    public int groupOut(GroupEnterDto dto);
    public List<GroupReturnDto> getList();
    public int addInterest(GroupInterestDto dto);
    public List<GroupInterestDto> interestlist(int userNo);
    public List<OptionDto> getOptions(int groupNo);
    public void addOption(Map<String, Object> param);

    public List<GroupReturnDto> categoryList(int categoryNo);
}
