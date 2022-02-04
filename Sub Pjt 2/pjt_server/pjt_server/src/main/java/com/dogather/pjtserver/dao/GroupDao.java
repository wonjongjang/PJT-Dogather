package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.GroupDto;
import com.dogather.pjtserver.dto.GroupEnterDto;
import com.dogather.pjtserver.dto.GroupInterestDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GroupDao {
    public int groupRegister(GroupDto groupDto);
    public int groupUpdate(GroupDto groupDto);
    public int groupDelete(int groupNo);
    public GroupDto group(int groupNo);
    public int groupEnter(GroupEnterDto dto);
    public int groupOut(GroupEnterDto dto);
    public int interest(GroupInterestDto dto);
    public List<GroupInterestDto> interestlist(int userNo);
    public List<GroupInterestDto> interestlistdetail(List<GroupInterestDto> dto);
}
