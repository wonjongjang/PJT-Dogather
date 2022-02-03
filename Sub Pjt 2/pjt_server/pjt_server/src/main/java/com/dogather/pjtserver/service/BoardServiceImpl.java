package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.BoardDao;
import com.dogather.pjtserver.dao.BoardMediaDao;
import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.handler.FileHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    public BoardDao boardDao;

    @Autowired
    public BoardMediaDao fileDao;

    @Autowired
    public FileHandler fileHandler;

    @Override
    public int createBoard(BoardDto boardDto) {
        boardDto.setCreated(LocalDateTime.now());
        return boardDao.createBoard(boardDto);
    }

    @Override
    public int createBoard(BoardDto boardDto, List<MultipartFile> files) throws IOException {
        int queryResult = 1;

        if (createBoard(boardDto) == 0)
            return 0;
        List<BoardMediaDto> fileList = fileHandler.uploadFiles(files, boardDto.getPostNo());
        if(CollectionUtils.isEmpty(fileList) == false) {
            queryResult = fileDao.insertFile(fileList);
            if (queryResult < 1) {
                queryResult = 0;
            }
        }
        return queryResult;
    }
}
