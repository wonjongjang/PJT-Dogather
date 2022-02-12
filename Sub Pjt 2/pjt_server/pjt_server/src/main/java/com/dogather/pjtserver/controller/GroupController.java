package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.*;
import com.dogather.pjtserver.handler.FileHandler;
import com.dogather.pjtserver.service.FAQService;
import com.dogather.pjtserver.service.GroupMediaService;
import com.dogather.pjtserver.service.GroupService;
import com.dogather.pjtserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/group")
@Slf4j
public class GroupController {

    @Autowired
    GroupService groupService;

    @Autowired
    GroupMediaService mediaService;

    @Autowired
    FileHandler fileHandler;

    @Autowired
    FAQService faqService;

    @Autowired
    UserService userService;

    @GetMapping("/list")
    public ResponseEntity<GroupListDto> list(){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getList());
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/detail/{groupNo}")
    public ResponseEntity<GroupOptionDto> group(@PathVariable int groupNo){
        List<GroupMediaDto> mediaDtoList = mediaService.fineAllMedia(groupNo);
        GroupReturnDto groupReturnDto = groupService.group(groupNo);
        List<FAQDto> faqDtoList = faqService.readFaqAll(groupNo);
        String mainImageName = null;
        List<String> mediaList = new ArrayList<>();
        for (GroupMediaDto mediaDto : mediaDtoList ) {
            if(mediaDto.getMainImageYn().equals("N")){
                mediaList.add(mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + mediaDto.getMediaSavename());
            } else {
                mainImageName = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/s_" + mediaDto.getMediaSavename();
            }
        }

        GroupOptionDto ret = new GroupOptionDto();
        ret.setGroupDto(groupReturnDto);
        List<OptionDto> options = groupService.getOptions(groupNo);
        ret.setOptions(options);
        ret.setMediaList(mediaList);
        ret.setFaqList(faqDtoList);
        ret.setMainImage(mainImageName);
        return new ResponseEntity<GroupOptionDto>(ret, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Integer> register(@RequestPart(value = "groupRegisterDto") GroupRegisterDto groupRegisterDto,
                                            @RequestPart(value = "file", required = false) List<MultipartFile> files,
                                            @RequestPart(value = "mainImage", required = false) MultipartFile mainImage) throws Exception{
        int created = groupService.groupRegister(groupRegisterDto.getGroup(), files, mainImage);
        if(created != 0){
            groupService.addOptions(groupRegisterDto.getGroup().getGroupNo() ,groupRegisterDto.getOptions());
            groupService.addFaq(groupRegisterDto.getGroup().getGroupNo(), groupRegisterDto.getRequestfaq());
            return new ResponseEntity<Integer>(created, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(created, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{groupNo}")
    public ResponseEntity<Integer> update(@RequestPart(value="GroupDto") GroupDto updategroupDto,
                      @RequestPart(value="file", required = false) List<MultipartFile> updateFiles) throws IOException {
        int groupNo = updategroupDto.getGroupNo();
        List<GroupMediaDto> dbMediaList = mediaService.fineAllMedia(groupNo);

        List<MultipartFile> addMediaList = new ArrayList<>();

        if (CollectionUtils.isEmpty(dbMediaList)) {
            if (!CollectionUtils.isEmpty(updateFiles)) {
                for (MultipartFile multipartFile : updateFiles)
                    addMediaList.add(multipartFile);
            }
        } else {
            if (CollectionUtils.isEmpty(updateFiles)) {
                for (GroupMediaDto dbFile : dbMediaList) {
                    fileHandler.deleteGroupMediaFile(dbFile);
                    mediaService.deleteMedia(dbFile.getMediaNo());
                }
            } else {
                for (GroupMediaDto dbFile : dbMediaList) {
                    fileHandler.deleteGroupMediaFile(dbFile);
                    mediaService.deleteMedia(dbFile.getMediaNo());
                }
            for (MultipartFile multipartFile : updateFiles) {
                    addMediaList.add(multipartFile);
                }
            }
        }
        int updated =  groupService.groupUpdate(groupNo, updategroupDto, addMediaList);
        if (updated != 0) {
            return ResponseEntity.status(HttpStatus.OK).body(updated);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(updated);
        }
    }


    @DeleteMapping("/{groupNo}")
    public ResponseEntity<Integer> delete(@PathVariable int groupNo){

        List<GroupMediaDto> dbMediaList = mediaService.fineAllMedia(groupNo);
        if (CollectionUtils.isEmpty(dbMediaList) == false) {
            for (GroupMediaDto dbFile :dbMediaList) {
                fileHandler.deleteGroupMediaFile(dbFile);
                mediaService.deleteMedia(dbFile.getMediaNo());
            }
        }
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
    public ResponseEntity<Integer> addInterest(@RequestBody GroupInterestDto dto) {
        int result = groupService.addInterest(dto);
        if (result == 1) {
            return new ResponseEntity<Integer>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Integer>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/csearch/{categoryNo}")
    public ResponseEntity<GroupListDto> categorySearch(@PathVariable int categoryNo){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.categoryList(categoryNo));
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @PostMapping("/wsearch")
    public ResponseEntity<GroupListDto> wordSearch(@RequestBody HashMap map){
        String word = map.get("word").toString();
        String[] tmp = word.split(" ");
        List<String> wordList = Arrays.asList(tmp);

        System.out.println(wordList.toString());

        GroupListDto list = new GroupListDto();
        list.setList(groupService.wordSearch(wordList));
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @PostMapping("/psearch")
    public ResponseEntity<GroupListDto> personSearch(@RequestBody HashMap map){
        String person = map.get("person").toString();

        GroupListDto list = new GroupListDto();
        list.setList(groupService.personSearch(person));
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @PostMapping("/review")
    public int review(@RequestBody ReviewDto dto){
        return groupService.review(dto);
    }

    @GetMapping("/review/{userNo}")
    public double reviewAvg(@PathVariable int userNo){
        return groupService.reviewAvg(userNo);
    }
}
