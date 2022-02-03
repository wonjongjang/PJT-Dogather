package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import com.dogather.pjtserver.service.BoardMediaService;
import com.dogather.pjtserver.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board")
@Slf4j
public class BoardController {

    @Autowired
    public BoardService boardService;

    @Autowired
    public BoardMediaService fileService;

    @PostMapping
    public int createBoard(
            @RequestPart(value = "BoardDto")BoardDto boardDto,
            @RequestPart(value = "file", required = false) List<MultipartFile> files
            ) throws Exception {
     return boardService.createBoard(boardDto, files);
    }

//    @GetMapping("/{boardNo}")
//    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable int boardNo) {
//        List<BoardMediaDto> fileDtoList = fileService.filndAllFile(boardNo);
//
//        List<int[]> fileNo = new ArrayList<>();
//
//        for (BoardMediaDto fileDto : fileDtoList) {
//           fileNo.add(fileDto.getMediaNo());
//        }
//
//    }

}
