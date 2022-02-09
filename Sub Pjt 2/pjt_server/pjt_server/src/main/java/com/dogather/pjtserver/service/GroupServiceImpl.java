package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.BoardMediaDao;
import com.dogather.pjtserver.dao.FAQDao;
import com.dogather.pjtserver.dao.GroupDao;
import com.dogather.pjtserver.dao.GroupMediaDao;
import com.dogather.pjtserver.dto.*;
import com.dogather.pjtserver.handler.FileHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupDao groupDao;

    @Autowired
    FAQDao faqDao;

    @Autowired
    FileHandler fileHandler;

    @Autowired
    GroupMediaDao mediaDao;

    @Override
    public int groupRegister(GroupDto groupDto) {
        return groupDao.groupRegister(groupDto);
    }

    @Override
    public int groupRegister(GroupDto groupDto, List<MultipartFile> files) throws IOException {
        int queryResult;
        if (groupRegister(groupDto) == 0)
            return 0;
        List<GroupMediaDto> mediaList = fileHandler.uploadGroupFiles(files, groupDto.getGroupNo());
        if(CollectionUtils.isEmpty(mediaList) == false) {
            mediaDao.insertMedia(mediaList);
        }
        queryResult = groupDto.getGroupNo();
        return queryResult;
    }


    @Override
    public int groupUpdate(int groupNo, GroupDto updategroupDto, List<MultipartFile> addMediaList) throws IOException {
        int queryResult = 1;
        groupDao.groupUpdate(updategroupDto);
        List<GroupMediaDto> mediaList = fileHandler.uploadGroupFiles(addMediaList, groupNo);
        if(CollectionUtils.isEmpty(mediaList) == false) {
            queryResult = mediaDao.insertMedia(mediaList);
            if(queryResult < 1) {
                queryResult = 0;
            }
        }
        return queryResult;
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

    @Override
    public void addFaq(int groupNo, List<FAQRequsetDto> requestFaq) {
        for (FAQRequsetDto Faq : requestFaq) {
            FAQDto dbFaq = new FAQDto();
            dbFaq.setGroupNo(groupNo);
            dbFaq.setCategoryNo(Faq.getCategoryNo());
            dbFaq.setFaqAnswer(Faq.getFaqAnswer());
            dbFaq.setFaqQuestion(Faq.getFaqQuestion());
            faqDao.createFaq(dbFaq);
        }
    }
}
