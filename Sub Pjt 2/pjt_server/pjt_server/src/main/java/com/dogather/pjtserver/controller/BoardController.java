package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import com.dogather.pjtserver.service.BoardMediaService;
import com.dogather.pjtserver.service.BoardService;
import com.dogather.pjtserver.service.CommentService;
import com.dogather.pjtserver.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board")
@Slf4j
public class BoardController {

    @Autowired
    public BoardService boardService;

    @Autowired
    public BoardMediaService mediaService;

    @Autowired
    public CommentService commentService;

    @Autowired
    public LikeService likeService;

    @PostMapping
    public int createBoard(
            @RequestPart(value = "BoardDto")BoardDto boardDto,
            @RequestPart(value = "file", required = false) List<MultipartFile> files
            ) throws Exception {
     return boardService.createBoard(boardDto, files);
    }

    @GetMapping("/{postNo}")
    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable int postNo) {
        List<BoardMediaDto> mediaDtoList = mediaService.findAllMedia(postNo);

        List<Integer> mediaList = new ArrayList<Integer>();

        for (BoardMediaDto mediaDto : mediaDtoList) {
            mediaList.add(mediaDto.getMediaNo());
        }
        BoardResponseDto boardResponseDto = boardService.findBoard(postNo);
        if(boardResponseDto != null) {
            // viewcount + 1 부분 수정 필요
            boardResponseDto.setBoardView(boardService.upView(postNo));
            boardResponseDto.setCommentList(commentService.findAllComment(postNo));
            boardResponseDto.setLikeUsers(likeService.findLikeAtBoard(postNo));
            boardResponseDto.setMediaNo(mediaList);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardResponseDto);
    }

    @PutMapping("/{postNo}")
    public int update(@PathVariable int postNo,
                       @RequestPart(value = "BoardDto") BoardDto updateBoardDto,
                       @RequestPart(value = "file", required = false) List<MultipartFile> updateFiles) throws IOException {

        List<BoardMediaDto> dbMediaList = mediaService.findAllMedia(postNo);

        List<MultipartFile> addMediaList = new ArrayList<>();

        if(CollectionUtils.isEmpty(dbMediaList)) {
            if(!CollectionUtils.isEmpty(updateFiles)) {
                for (MultipartFile multipartFile : updateFiles)
                    addMediaList.add(multipartFile);
            }
        }
        else {
            if(CollectionUtils.isEmpty(updateFiles)) {
                for(BoardMediaDto dbFile : dbMediaList)
                    mediaService.deleteMedia(dbFile.getMediaNo());
            }
            else {
                List<String> dbOrginFileNameList = new ArrayList<>();

                for(BoardMediaDto dbMedia : dbMediaList) {
                    BoardMediaDto dbMediaDto = mediaService.findMedia(dbMedia.getMediaNo());

                    String dbOrginFileName = dbMediaDto.getMediaSavename();

                    if(!updateFiles.contains(dbOrginFileName)) {
                        mediaService.deleteMedia(dbMedia.getMediaNo());
                    }
                    else {
                        dbOrginFileNameList.add(dbOrginFileName);
                    }
                }
                for(MultipartFile multipartFile : updateFiles) {

                    String multipartOriginName = multipartFile.getOriginalFilename();
                    if(!dbOrginFileNameList.contains(multipartOriginName)) {
                        addMediaList.add(multipartFile);
                    }
                }
            }
        }
        return boardService.updateBoard(postNo, updateBoardDto, addMediaList);
    }



}
