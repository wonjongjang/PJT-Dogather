package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import java.util.List;

public interface GroupService {
    public int groupRegister(GroupDto groupDto);
    public int groupRegister(GroupDto groupDto, List<MultipartFile> files, MultipartFile mainImage) throws IOException;

    public int groupUpdate(int groupNo, GroupDto updateGroupDto, List<MultipartFile> addMediaList) throws IOException;

    public int groupDelete(int groupNo);
    public GroupReturnDto group(int groupNo);
    public int groupEnter(GroupEnterDto dto);
    public int groupOut(GroupEnterDto dto);
    public List<GroupReturnDto> getList();
    public List<GroupReturnDto> getHotList();
    public List<GroupReturnDto> getNewList();



    public int addInterest(GroupInterestDto dto);
    public List<OptionDto> getOptions(int groupNo);
    public void addOptions(int groupNo, List<OptionDto> options);

    public void addFaq(int groupNo, List<FAQRequsetDto> faq);

    public List<GroupReturnDto> categoryList(int categoryNo);

    public List<GroupReturnDto> wordSearch(List<String> wordList);

    public List<GroupReturnDto> personSearch(String person);

    public int review(ReviewDto dto);

    public double reviewAvg(int userNo);

    public List<GroupReturnDto> findUserLikeGroup(int userNo);
}
